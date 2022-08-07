import Typography from "@mui/material/Typography";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <span color="inherit">DEVKIND CODE TEST - Shang Gao</span>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
