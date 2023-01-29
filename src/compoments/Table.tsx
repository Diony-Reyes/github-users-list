import React from "react";
import styles from "../styles/Table.module.scss";
import { Button } from "@material-ui/core";

import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Column {
  id: "id" | "name" | "image" | "action";
  label: string;
  maxWidth?: number;
  align?: "right" | "center";
}

interface TableListProps {
  data: User[];
}

export default function TableList({ data }: TableListProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const columns: Column[] = [
    { id: "id", label: "id", maxWidth: 10, align: "center" },
    { id: "image", label: "foto", maxWidth: 10 },
    {
      id: "name",
      label: "nombre",
      maxWidth: 450,
    },
    {
      id: "action",
      label: "Acción",
      maxWidth: 170,
      align: "right",
    },
  ];

  const rows = data.map((user) => {
    return {
      id: user.id,
      image: user.avatar_url,
      name: user.login,
      action: (
        <div className={styles.action}>
          <Button className={styles.button} variant="outlined">
            <Link to={`user/${user.login}`}>Ver detalles</Link>
          </Button>
        </div>
      ),
    };
  });

  return (
    <div>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead className={styles.head}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ maxWidth: column.maxWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ width: column.maxWidth }}
                        >
                          {column.id === "image" &&
                          typeof value === "string" ? (
                            <img
                              src={value}
                              alt="profile"
                              width={50}
                              height={50}
                              style={{ borderRadius: "50%" }}
                            />
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        labelRowsPerPage="Filas por páginas"
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
