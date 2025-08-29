import * as React from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

type GalleryCarouselProps = {
  images: string[];
  interval?: number;
  speed?: number;
  heights?: { xs?: number; sm?: number; md?: number; lg?: number };
};

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({
  images,
  interval = 4000,
  speed = 600,
  heights = { xs: 260, sm: 360, md: 480 },
}) => {
  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const touchStartX = React.useRef<number | null>(null);

  const count = images.length;

  const next = React.useCallback(
    () => setIndex((i) => (i + 1) % count),
    [count]
  );
  const prev = React.useCallback(
    () => setIndex((i) => (i - 1 + count) % count),
    [count]
  );

  React.useEffect(() => {
    if (paused || count <= 1) return;
    const id = window.setInterval(next, interval);
    return () => window.clearInterval(id);
  }, [paused, count, next, interval]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <Box
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      sx={{ position: 'relative', overflow: 'hidden', borderRadius: 2 }}
    >
      <Box
        sx={{
          display: 'flex',
          width: `${count * 100}%`,
          transform: `translateX(-${index * (100 / count)}%)`,
          transition: `transform ${speed}ms ease`,
        }}
      >
        {images.map((src, i) => (
          <Box
            key={i}
            sx={{
              flex: `0 0 ${100 / count}%`,
              px: { xs: 0, sm: 0 },
            }}
          >
            <Box
              component="img"
              src={src}
              alt={`Gallery ${i + 1}`}
              sx={{
                width: '100%',
                height: {
                  xs: heights.xs ?? 260,
                  sm: heights.sm ?? heights.xs ?? 260,
                  md: heights.md ?? heights.sm ?? 450,
                  lg: heights.lg ?? heights.md ?? 550,
                },
                objectFit: 'cover',
                display: 'block',
                borderRadius: 2,
                border: (t) => `1px solid ${t.palette.divider}`,
              }}
            />
          </Box>
        ))}
      </Box>

      {count > 1 && (
        <>
          <IconButton
            aria-label="Previous"
            onClick={prev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 8,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.35)',
              color: 'common.white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            aria-label="Next"
            onClick={next}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 8,
              transform: 'translateY(-50%)',
              bgcolor: 'rgba(0,0,0,0.35)',
              color: 'common.white',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}

      {count > 1 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{
            position: 'absolute',
            bottom: 10,
            left: '50%',
            transform: 'translateX(-50%)',
            bgcolor: 'rgba(0,0,0,0.25)',
            px: 1,
            py: 0.5,
            borderRadius: 999,
          }}
        >
          {images.map((_, i) => (
            <Box
              key={i}
              onClick={() => setIndex(i)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                cursor: 'pointer',
                bgcolor: i === index ? 'secondary.main' : 'grey.300',
                outline:
                  i === index
                    ? (t) => `2px solid ${t.palette.primary.main}`
                    : 'none',
              }}
            />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default GalleryCarousel;
