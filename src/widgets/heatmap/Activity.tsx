interface ActivityProps {
  contributions: string[];
}

export function Activity({ contributions }: ActivityProps) {
  return (
    <ul>
      {contributions.map((el) => (
        <li>{el}</li>
      ))}
    </ul>
  );
}
