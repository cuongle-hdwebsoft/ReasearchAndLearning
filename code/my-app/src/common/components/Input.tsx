interface IInput {
  value?: string;
  onChange?: (value: string) => void;
}

export default function Input(props: IInput) {
  console.log("Input render", props);

  return <input className="input" placeholder="Type something..." />;
}
