import Interests from "./../../../../../../constants/Interests";

interface TechIconProps {
  /** 기술스택 아이콘 */
  techStack: keyof typeof Interests;
}

const TechIcon = ({ techStack }: TechIconProps) => {
  return (
    <img
      src={`/interests/${Interests[techStack]}.svg`}
      alt={`${Interests[techStack]} icon`}
    />
  );
};

export default TechIcon;
