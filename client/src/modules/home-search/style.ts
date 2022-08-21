import { StyleFunction } from 'react-fela';

export const textPreview: StyleFunction<{}, { dark: boolean }> = ({ dark }) => ({
  padding: '1px 15px',
  height: 44,
  overflow: 'hidden',
  fontFamily: 'SF Pro Rounded',
  '>dfn:first-child': {
    display: 'block',
    fontSize: '16px',
    lineHeight: '20px',
    letterSpacing: '-0.24px',
    marginBottom: '8px',
    color: dark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    textTransform: 'lowercase',
    fontStyle: 'normal !important',
    '>b::after': {
      fontWeight: 600,
      content: '"\\0301"',
      color: dark ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)',
    },
  },
  fontSize: '14px',
  lineHeight: '1px',
  letterSpacing: '-0.154px',
  color: dark ? 'rgba(255, 255, 255, 0.35)' : 'rgba(0, 0, 0, 0.35)',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  ':active': {
    background: 'linear-gradient(90deg, rgba(0, 0, 0, 0.1) 89.07%, rgba(0, 0, 0, 0) 100%)',
  },
});
