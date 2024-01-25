import { useRouter } from "next/router";
import React from "react";

interface MenuCardProps {
  label: string;
  className: string;
  imgUrl: string;
  route: string;
}

const MenuCard: React.FC<MenuCardProps> = ({
  className,
  imgUrl,
  label,
  route,
}) => {
  const router = useRouter();
  return (
    <div
      className={"border p-2 " + className}
      style={{ backgroundImage: `${imgUrl}` }}
      onClick={() => {
        router.push(route);
      }}
    >
      <span className="text-4xl">{label}</span>
    </div>
  );
};
export default MenuCard;
