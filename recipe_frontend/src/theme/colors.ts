export const Colors = {
  primary: '#2563EB', // Ocean Professional
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  muted: '#6B7280',
  shadow: 'rgba(0,0,0,0.08)',
};

export const Gradients = {
  subtle: ['#3B82F610', '#F9FAFB'], // primary/10 to background
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
};

export const Typography = {
  title: {
    fontSize: 22,
    fontWeight: '700' as const,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.muted,
  },
  body: {
    fontSize: 14,
    color: Colors.text,
  },
  caption: {
    fontSize: 12,
    color: Colors.muted,
  },
};
