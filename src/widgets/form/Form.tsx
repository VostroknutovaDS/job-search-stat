import type { State } from "../../entities/state";
import type { Statistics } from "../../entities/statistics";
import { STATES } from "../../shared/application-states";
import styles from "./Form.module.css";

interface FormProps {
  onApplicationStateChange: (newState: State) => void;
}

type FormField = {
  label: string;
  stateKey: keyof State;
};

function Form({ onApplicationStateChange }: FormProps) {
  const fields: FormField[] = [
    { label: STATES.APPLIED, stateKey: STATES.APPLIED as keyof Statistics },
    { label: STATES.SCREENING, stateKey: STATES.SCREENING as keyof Statistics },
    {
      label: STATES.TECH_INTERVIEW,
      stateKey: STATES.TECH_INTERVIEW as keyof Statistics,
    },
    { label: STATES.REFUSED, stateKey: STATES.REFUSED as keyof Statistics },
  ];

  return (
    <form className={styles.form}>
      {fields.map(({label, stateKey}) => (
        <div key={stateKey} className={styles.field}>
          <label>{label}</label>
          <input
            type="number"
            onChange={(e) =>
              onApplicationStateChange({ [stateKey]: e.target.valueAsNumber })
            }
          ></input>
        </div>
      ))}
    </form>
  );
}

export default Form;
