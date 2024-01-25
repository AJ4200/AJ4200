import React from "react";

interface MenuCardProps {
  label: string;
  className: string;
    imgUrl: string;
    route: string;
}

const MenuCard: React.FC<MenuCardProps> = ({ className, imgUrl, label ,route}) => {
  return (
    <div
      className={"border p-2 " + className}
      style={{ backgroundImage: `${imgUrl}` }}
    >
          <span className="h-full"><a href={route}>{label}</a></span>
          
    </div>
  );
};
export default MenuCard;
