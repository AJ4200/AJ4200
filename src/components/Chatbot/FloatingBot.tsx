import { useRouter } from 'next/router';
import React, { useEffect } from'react';
import { getStyles, getNeonColor } from '../../lib/navbarUtils';
interface FloatingBotProps {
  onClick: () => void;
} 

const FloatingBot: React.FC<FloatingBotProps> = ({onClick}) => 
{
    const router = useRouter();
    const { asPath } = router;
    
      useEffect(() => {
        const body = document.querySelector("body");
        if (body) {
          const styles = getStyles(asPath);
          body.style.backgroundImage = styles.backgroundImage;
          body.style.fontFamily = styles.fontFamily;
        }
        document.documentElement.style.setProperty(
          "--neon",
          getNeonColor(asPath)
        );
      }, [asPath]);

return (
  <div className="cute-robot-v1 " onClick={onClick}>
    <div className="circle-bg">
      <div className="robot-ear left"></div>
      <div className="robot-head">
        <div className="robot-face">
          <div className="eyes left"></div>
          <div className="eyes right"></div>
          <div className="mouth"></div>
        </div>
      </div>
      <div className="robot-ear right"></div>
      <div className="robot-body"></div>
    </div>
  </div>
);
}
export default FloatingBot;