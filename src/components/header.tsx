"use client";
import React from "react";
import styles from "../styles/Header.module.css";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavbarStore } from "@/stores/navbarStore";

// todo transition X button

const Header = () => {
  const navbarStatus = useNavbarStore((state) => state.navbarStatus);
  const changeStatus = useNavbarStore((state) => state.changeStatus);

  const handleToggle = () => {
    if (navbarStatus === true) {
      changeStatus(false);
    } else {
      changeStatus(true);
    }
  };

  const closeMenu = () => {
    changeStatus(false);
  };

  return (
    <div className={`${styles.header}`}>
      <h1 className={styles.headerSize}>
        <Link href={"/"} className={styles.a}>
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Nana's Memories
        </Link>
      </h1>
      <div className={styles.keepRight}>
        {navbarStatus === false ? (
          <div className={`${styles.menuBtn}`}>
            <GiHamburgerMenu
              onClick={handleToggle}
              // style={{ backgroundColor: "var(--secondaryBackground)" }}
            />
          </div>
        ) : (
          <div onClick={handleToggle} className={`${styles.xBtnContainer}`}>
            <div
              className={`${styles.iconWidth} ${styles.openBtn} ${styles.xBtn}`}
            >
              X
            </div>
          </div>
        )}
      </div>
      <div className={styles.sideNav}>
        <ul
          className={`${styles.menuNav} ${
            navbarStatus === true ? `${styles.showMenu}` : `${styles.hideNav}`
          }`}
        >
          <Link
            href={"/"}
            className="whiteFont"
            style={{
              backgroundColor: "var(--secondary-color)",
              textDecoration: "none",
            }}
          >
            <li
              className={`${styles.headerBtn} ${styles.menuItem}`}
              onClick={closeMenu}
            >
              Home
            </li>
          </Link>
          <Link
            href={"/About"}
            className=" whiteFont"
            style={{
              backgroundColor: "var(--secondary-color)",
              textDecoration: "none",
            }}
          >
            <li
              className={`${styles.headerBtn} ${styles.menuItem}`}
              onClick={closeMenu}
            >
              About
            </li>
          </Link>
          <Link
            className=" whiteFont"
            href={"/FamilyTree"}
            style={{
              backgroundColor: "var(--secondary-color)",
              textDecoration: "none",
            }}
          >
            <li
              className={`${styles.headerBtn} ${styles.menuItem}`}
              onClick={closeMenu}
            >
              Family Tree
            </li>
          </Link>
          <Link
            className=" whiteFont"
            href={"/AddMemory"}
            style={{
              backgroundColor: "var(--secondary-color)",
              textDecoration: "none",
            }}
          >
            <li
              className={`${styles.headerBtn} ${styles.menuItem}`}
              onClick={closeMenu}
            >
              Add a Memory
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
