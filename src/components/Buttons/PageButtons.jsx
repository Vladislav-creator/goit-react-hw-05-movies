import { Button } from './Buttons';
import css from "./Buttons.module.css"
export const PageButtons = ({ page, totalPages, handlePageChange }) => {
    if (totalPages === 1) {
      return null;
    }
  
    return (
      <div className={css.buttonsCounterPage}>
        <Button
          disabled={page === 1}
          label="Prev page"
          icon="left_arrow"
          onClick={() => handlePageChange(page - 1)}
        />
        <div className={css.numberPage}>{page}</div>
        <Button
          disabled={page === totalPages}
          label="Next page"
          icon="right_arrow"
          reverse="true"
          onClick={() => handlePageChange(page + 1)}
        />
      </div>
    );
  };
  