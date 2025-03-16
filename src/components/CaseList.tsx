import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  CircularProgress,
} from "@mui/material";
import { useAccessToken } from "@/hooks/auth";

interface Case {
  id: number;
  victimName: string;
  province: string;
  location: string;
  aggressor: string;
  updatedAt: string;
}

const CaseList = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [sortedCases, setSortedCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderBy, setOrderBy] = useState<keyof Case>("victimName");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const token = useAccessToken();

  const accessToken = useAccessToken();

  useEffect(() => {
    const fetchCases = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/v1/cases`, {
          headers: {
            Authorization: accessToken.asAuthorizationHeader(),
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setCases(data);
        setSortedCases(data);
      } catch (error) {
        console.error("Error fetching cases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, [token]);

  useEffect(() => {
    const sorted = [...cases].sort((a, b) => {
      const valueA = a[orderBy];
      const valueB = b[orderBy];
      if (valueA < valueB || valueB == null) {
        return order === "asc" ? -1 : 1;
      }
      if (valueA > valueB || valueA == null) {
        return order === "asc" ? 1 : -1;
      }

      return 0;
    });

    setSortedCases(sorted);
  }, [orderBy, order, cases]);

  const handleSort = (property: keyof Case) => {
    setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <TableContainer component={Paper}>
      {loading ? (
        <CircularProgress style={{ margin: "20px auto", display: "block" }} />
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              {[
                "victimName",
                "province",
                "location",
                "aggressor",
                "updatedAt",
              ].map((column) => (
                <TableCell key={column}>
                  <TableSortLabel
                    active={orderBy === column}
                    direction={orderBy === column ? order : "asc"}
                    onClick={() => handleSort(column as keyof Case)}
                  >
                    {column.charAt(0).toUpperCase() + column.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell>{caseItem.victimName}</TableCell>
                <TableCell>{caseItem.province}</TableCell>
                <TableCell>{caseItem.location}</TableCell>
                <TableCell>{caseItem.aggressor}</TableCell>
                <TableCell>{caseItem.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
};

export default CaseList;
