import { Chip } from "@heroui/chip";

interface CountDisplayProps {
  count: number;
  maxCount: number;
}

const CountDisplay: React.FC<CountDisplayProps> = ({ count, maxCount }) => {
  return (
    <Chip
      size="sm"
      className="opacity-50 cursor-default"
      classNames={{ base: "bg-foreground-300" }}
    >
      {count}/{maxCount}
    </Chip>
  );
};

export default CountDisplay;
