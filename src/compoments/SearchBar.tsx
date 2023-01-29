import React from "react";
import Button from "../elements/Button";
import Input from "../elements/Input";
import styles from "../styles/SearchBar.module.scss";

import { Delete, Search } from "../elements/Icon";

interface SearchBarProps {
  search: string;
  onChangeSearch: (value: string) => void;
  onClickSearch: () => void;
  onClickClearSearch: () => void;
}

export default function SearchBar({
  search,
  onChangeSearch,
  onClickSearch,
  onClickClearSearch,
}: SearchBarProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeSearch(event.target.value);
  };

  return (
    <div className={styles.container}>
      <div className="row">
        <div className="col-xl-9 col-lg-8 col-sm-6 col-md-7 col-12">
          <Input
            className="w-100"
            placeholder="Buscar..."
            value={search}
            onChange={handleChange}
          />
        </div>

        <div className="col-xl-3 col-lg-4 col-sm-6 col-md-5 col-12 mt-3 mt-sm-0">
          <div className="row">
            <div className="col-6">
              <Button onClick={() => onClickSearch()}>
                <Search className={styles.icon} size={20} color="#fff" />
                Buscar
              </Button>
            </div>

            <div className="col-6">
              <Button
                className="bg-danger"
                onClick={() => onClickClearSearch()}
              >
                <Delete className={styles.icon} size={20} color="#fff" />
                Limpiar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
