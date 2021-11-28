import TextField from "@mui/material/TextField";
import { useSession } from "next-auth/react";
import React, { FC, useState } from "react";
import AppNavigation from "../components/Navigation/AppNavigation";
import { convertFastTransactionToTransaction } from "../utils/convertFastTransactionToTransaction/convertFastTransactionToTransaction";
import { RecognizableEntries } from "../utils/convertFastTransactionToTransaction/convertFastTransactionToTransaction.types";

// TODO: remove after create short transaction input
const Dashboard: FC<{}> = () => {
  const { data: sessionData } = useSession({ required: true });
  const [input, setInput] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(event.target.value);
    }
  };

  const CATEGORIES = "Spożywcze|Restauracje|Transport|BM|Dom";
  //   console.log(DATE_REGEX);
  const all_entities: RecognizableEntries[] = [
    {
      type: "subcategory",
      id: 1,
      name: "Spożywcze",
    },
    {
      type: "tag",
      id: 12,
      name: "Kaufland",
    },
    {
      type: "tag",
      id: 15,
      name: "Kraków",
    },
    {
      type: "subcategory",
      id: 21,
      name: "Dom",
    },
    {
      type: "subcategory",
      id: 22,
      name: "Domownicy",
    },
    {
      type: "subcategory",
      id: 23,
      name: "Wynagrodzenie",
    },
  ];

  convertFastTransactionToTransaction(
    // "12.12 -18.49 Sp Kau Kr #Kau #Kr `wiourhwe",
    // "12.12 -18.49 Do Kau Kr #Kau #Kr `wiourhwe",
    "12.12 -18.49 Domo Kau Kr #Kau #Kr `wiourhwe",
    // "12.12 +250 W 'company",
    all_entities
  );

  return (
    <AppNavigation>
      <TextField
        id="input"
        value={input}
        onChange={handleChange}
        onKeyUp={handleEnter}
      />
    </AppNavigation>
  );
};

export default Dashboard;
