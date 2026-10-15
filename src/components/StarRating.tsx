type StarRatingProps = {
  rating: number;
  reviewCount?: number;
};

export default function StarRating({ rating, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex items-center gap-1"
        role="img"
        aria-label={`Rated ${rating} out of 5 stars`}
      >
        {Array.from({ length: 5 }, (_, index) => {
          const filled = index < Math.round(rating);

          return (
            <svg
              key={index}
              width="22"
              height="22"
              viewBox="0 0 38 38"
              aria-hidden="true"
            >
              <path
                d="M19 0 C22 12 26 16 38 19 C26 22 22 26 19 38 C16 26 12 22 0 19 C12 16 16 12 19 0Z"
                fill={filled ? "#E07A5F" : "#E5E0DC"}
              />
            </svg>
          );
        })}
      </div>

      <span className="text-sm text-foreground/70">
        {rating.toFixed(1)} / 5
      </span>

      {reviewCount !== undefined && (
        <a
          href="#reviews"
          className="text-sm text-foreground/50 underline-offset-4 hover:text-accent hover:underline"
        >
          ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
        </a>
      )}
    </div>
  );
}
