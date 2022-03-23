interface IInput {
  value?: string;
  onChange?: (value: string) => void;
}

export default function Input(props: IInput) {
  console.log("Input render");

  return <input className="input" placeholder="Type something..." />;
}
