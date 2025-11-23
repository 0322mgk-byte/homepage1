'use client';

import { useState, useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Star, User, ThumbsUp, Loader2, ImagePlus, X } from 'lucide-react';
import Image from 'next/image';

interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  userImage?: string;
  rating: number;
  content: string;
  images?: string[];
  helpful: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductReviewProps {
  productId: string;
  productName: string;
}

export default function ProductReview({ productId, productName }: ProductReviewProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');
  const [userHasReviewed, setUserHasReviewed] = useState(false);

  // 이미지 관련 상태
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 확대 이미지 모달
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // 리뷰 목록 불러오기
  useEffect(() => {
    fetchReviews();
  }, [productId]);

  // 이미지 미리보기 URL 정리
  useEffect(() => {
    return () => {
      previewUrls.forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  const fetchReviews = async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${productId}`);
      const data = await res.json();
      if (data.reviews) {
        setReviews(data.reviews);
        // 현재 사용자가 이미 리뷰를 작성했는지 확인
        if (session?.user?.email) {
          const hasReviewed = data.reviews.some(
            (review: Review) => review.userEmail === session.user?.email
          );
          setUserHasReviewed(hasReviewed);
        }
      }
    } catch (err) {
      console.error('리뷰 불러오기 실패:', err);
    } finally {
      setLoading(false);
    }
  };

  // 이미지 선택 핸들러
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // 최대 5개 이미지 제한
    const totalImages = selectedImages.length + files.length;
    if (totalImages > 5) {
      setError('이미지는 최대 5개까지 첨부할 수 있습니다.');
      return;
    }

    // 파일 검증
    const validFiles: File[] = [];
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    for (const file of files) {
      if (!allowedTypes.includes(file.type)) {
        setError('지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WEBP만 가능)');
        continue;
      }
      if (file.size > maxSize) {
        setError('파일 크기는 5MB 이하여야 합니다.');
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      setSelectedImages(prev => [...prev, ...validFiles]);
      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviews]);
      setError('');
    }

    // input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 이미지 제거
  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setPreviewUrls(prev => prev.filter((_, i) => i !== index));
  };

  // 이미지 업로드
  const uploadImages = async (): Promise<string[]> => {
    if (selectedImages.length === 0) return [];

    setUploadingImages(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of selectedImages) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('folder', 'reviews');

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (data.success && data.url) {
          uploadedUrls.push(data.url);
        } else {
          throw new Error(data.error || '이미지 업로드 실패');
        }
      }
      return uploadedUrls;
    } catch (err) {
      console.error('이미지 업로드 오류:', err);
      throw err;
    } finally {
      setUploadingImages(false);
    }
  };

  // 리뷰 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      setError('로그인이 필요합니다.');
      return;
    }
    if (content.trim().length < 10) {
      setError('리뷰는 최소 10자 이상 작성해주세요.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      // 이미지 업로드
      let imageUrls: string[] = [];
      if (selectedImages.length > 0) {
        imageUrls = await uploadImages();
      }

      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId,
          productName,
          rating,
          content: content.trim(),
          images: imageUrls,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setContent('');
        setRating(5);
        setSelectedImages([]);
        setPreviewUrls([]);
        setShowForm(false);
        fetchReviews();
      } else {
        setError(data.error || '리뷰 작성에 실패했습니다.');
      }
    } catch (err) {
      setError('리뷰 작성 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  // 도움됨 클릭
  const handleHelpful = async (reviewId: string) => {
    if (!session?.user) return;

    try {
      await fetch(`/api/reviews/${reviewId}/helpful`, {
        method: 'POST',
      });
      fetchReviews();
    } catch (err) {
      console.error('도움됨 업데이트 실패:', err);
    }
  };

  // 평균 별점 계산
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  // 별점 렌더링
  const renderStars = (rating: number, interactive = false, size = 'w-5 h-5') => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : undefined}
            disabled={!interactive}
            onClick={() => interactive && setRating(star)}
            onMouseEnter={() => interactive && setHoverRating(star)}
            onMouseLeave={() => interactive && setHoverRating(0)}
            className={interactive ? 'cursor-pointer' : 'cursor-default'}
          >
            <Star
              className={`${size} ${
                star <= (interactive ? (hoverRating || rating) : rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  // 날짜 포맷
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section className="py-16 border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">수강생 리뷰</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(averageRating))}
                <span className="text-lg font-semibold text-white">
                  {averageRating.toFixed(1)}
                </span>
              </div>
              <span className="text-gray-400">
                ({reviews.length}개의 리뷰)
              </span>
            </div>
          </div>
          {session?.user && !userHasReviewed && (
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              리뷰 작성
            </button>
          )}
        </div>

        {/* 리뷰 작성 폼 */}
        {showForm && session?.user && (
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">리뷰 작성하기</h3>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">별점</label>
              {renderStars(rating, true, 'w-8 h-8')}
            </div>

            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                리뷰 내용 (최소 10자)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="수강 후기를 자유롭게 작성해주세요..."
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={4}
              />
              <div className="text-right text-sm text-gray-400 mt-1">
                {content.length}자
              </div>
            </div>

            {/* 이미지 첨부 */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-2">
                이미지 첨부 (선택, 최대 5개)
              </label>

              {/* 이미지 미리보기 */}
              {previewUrls.length > 0 && (
                <div className="flex flex-wrap gap-3 mb-3">
                  {previewUrls.map((url, index) => (
                    <div key={index} className="relative group">
                      <Image
                        src={url}
                        alt={`Preview ${index + 1}`}
                        width={100}
                        height={100}
                        className="w-24 h-24 object-cover rounded-lg border border-gray-600"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 이미지 추가 버튼 */}
              {selectedImages.length < 5 && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/gif,image/webp"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                    id="review-images"
                  />
                  <label
                    htmlFor="review-images"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-600 cursor-pointer transition-colors"
                  >
                    <ImagePlus className="w-5 h-5" />
                    <span>이미지 추가</span>
                  </label>
                  <span className="ml-3 text-sm text-gray-500">
                    {selectedImages.length}/5
                  </span>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting || uploadingImages}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {(submitting || uploadingImages) && <Loader2 className="w-4 h-4 animate-spin" />}
                {uploadingImages ? '이미지 업로드 중...' : submitting ? '제출 중...' : '리뷰 등록'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setError('');
                  setSelectedImages([]);
                  setPreviewUrls([]);
                }}
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                취소
              </button>
            </div>
          </form>
        )}

        {/* 로그인 안내 */}
        {!session?.user && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8 text-center">
            <p className="text-gray-400">
              리뷰를 작성하려면{' '}
              <a href="/login" className="text-blue-400 hover:underline">
                로그인
              </a>
              이 필요합니다.
            </p>
          </div>
        )}

        {/* 이미 리뷰 작성한 경우 */}
        {session?.user && userHasReviewed && (
          <div className="bg-gray-800 rounded-lg p-4 mb-8 text-center">
            <p className="text-gray-400">이미 이 상품에 리뷰를 작성하셨습니다.</p>
          </div>
        )}

        {/* 리뷰 목록 */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">아직 작성된 리뷰가 없습니다.</p>
            <p className="text-gray-500 text-sm mt-1">첫 번째 리뷰를 작성해보세요!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-800/50 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  {/* 프로필 이미지 */}
                  <div className="flex-shrink-0">
                    {review.userImage ? (
                      <Image
                        src={review.userImage}
                        alt={review.userName}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* 리뷰 내용 */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-white">{review.userName}</span>
                      {renderStars(review.rating, false, 'w-4 h-4')}
                    </div>
                    <p className="text-gray-300 mb-3 whitespace-pre-wrap">{review.content}</p>

                    {/* 리뷰 이미지 */}
                    {review.images && review.images.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {review.images.map((img, idx) => (
                          <button
                            key={idx}
                            onClick={() => setEnlargedImage(img)}
                            className="relative group"
                          >
                            <Image
                              src={img}
                              alt={`Review image ${idx + 1}`}
                              width={120}
                              height={120}
                              className="w-24 h-24 object-cover rounded-lg border border-gray-600 hover:border-blue-500 transition-colors cursor-pointer"
                            />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-500">{formatDate(review.createdAt)}</span>
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                        disabled={!session?.user}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>도움됨 ({review.helpful})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 이미지 확대 모달 */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setEnlargedImage(null)}
        >
          <button
            onClick={() => setEnlargedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <Image
            src={enlargedImage}
            alt="Enlarged review image"
            width={1200}
            height={800}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
