import { CSSProperties, FC } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoStatsChart } from "react-icons/io5";
import { FaQuestion } from "react-icons/fa6";
import { FaBlind } from "react-icons/fa";
import { MdPersonSearch } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { RiRobot2Fill } from "react-icons/ri";

const IconsIndex = {
  agent: MdOutlineSupportAgent,
  metrics: IoStatsChart,
  question: FaQuestion,
  queryStats: FaBlind,
  searchAgent: MdPersonSearch,
  arrow: FaArrowRight,
  bot: RiRobot2Fill,
};

const Index = {
  ...IconsIndex,
}

export type IconName = keyof typeof Index | "none";

type Props = {
  id?: string
  icon: IconName
  className?: string
  style?: CSSProperties
  onClick?: () => void;
}

export const Icon: FC<Props> = ({ icon, id, className, style, onClick }) => {
  if (icon == "none") {
    return null;
  }

  const Icon = Index[icon];
  return (
    <Icon id={id} className={className} style={style} onClick={onClick} />
  )
}
