import styles from "./Header.module.css";

const Header: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <>
      <div id={styles["main-header-loading"]}></div>
      <header id={styles["main-header"]}>
        <div id={styles["header-title"]}>
          <h1>Blog App</h1>
        </div>
        <nav>{props.children}</nav>
      </header>
    </>
  );
};

export default Header;
