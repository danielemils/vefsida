import { Chip } from "@nextui-org/chip";

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <Chip
      className="mx-auto"
      classNames={{
        base: "bg-red-400 text-primary-foreground text-center cursor-default",
      }}
    >
      {message}
    </Chip>
  );
};

export default ErrorMessage;
