import { List, ListItem, ListItemText } from "@mui/material";
import { useAccessToken } from "@/hooks/auth";

interface Case {
    id: number;
    victimName: string;
    province: string;
    location: string;
    aggressor: string;
}

const casesData: Case[] = [
  {
    id: 1234,
    victimName: "Nicole Guevara",
    province: "Buenos Aires",
    location: "Mar del plata",
    aggressor: "Aramis Perez",
  },
  {
    id: 1235,
    victimName: "Andreas Gimenez",
    province: "Salta",
    location: "Salta",
    aggressor: "Pablo Demiret",
  },
];

const CaseList = () => {
  return (
    <List>
      {casesData.map((caseItem) => (
        <ListItem key={caseItem.id}>
          <ListItemText primary={caseItem.victimName} />
        </ListItem>
      ))}
    </List>
  );
};

export default CaseList;
