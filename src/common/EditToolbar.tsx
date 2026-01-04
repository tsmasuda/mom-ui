import { SaveButton, Toolbar, Button } from "react-admin";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

export const EditToolbar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Toolbar sx={{ justifyContent: "space-between" }}>
      <SaveButton />
      <Button label="Cancel" onClick={handleGoBack}>
        <CloseIcon />
      </Button>
    </Toolbar>
  );
};
