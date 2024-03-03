// ResponsiveNav.jsx
import useMediaQuery from '@mui/material/useMediaQuery';

const ResponsiveNav = () => {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div style={{ display: isMobile ? 'block' : 'flex' }}>
      {/* Nav items */}
    </div>
  );
};

export default ResponsiveNav;
