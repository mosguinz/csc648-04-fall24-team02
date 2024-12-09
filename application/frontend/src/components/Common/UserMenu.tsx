import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "@tanstack/react-router";
import { FaUserAstronaut } from "react-icons/fa";
import { FiLogOut, FiUser } from "react-icons/fi";

import useAuth, { isLoggedIn } from "../../hooks/useAuth";

const UserMenu = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    logout();
  };

  return (
    <>
      {/* Desktop */}
      <Box
        display={{ base: "none", md: "block" }}
        // position="fixed"
        top={4}
        right={4}
      >
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<FaUserAstronaut color="white" fontSize="18px" />}
            bg="ui.main"
            size="lg"
            px={10} // Increase horizontal padding
            py={6}
            isRound
            data-testid="user-menu"
          />
          {isLoggedIn() ? (
            <MenuList>
              <MenuItem
                icon={<FiUser fontSize="18px" />}
                as={Link}
                to="settings"
              >
                My profile
              </MenuItem>
              <MenuItem
                icon={<FiLogOut fontSize="18px" />}
                onClick={handleLogout}
                color="ui.danger"
                fontWeight="bold"
              >
                Log out
              </MenuItem>
            </MenuList>
          ) : (
            <MenuList>
              <MenuItem icon={<FiUser fontSize="18px" />} as={Link} to="login">
                Log in
              </MenuItem>
            </MenuList>
          )}
        </Menu>
      </Box>
    </>
  );
};

export default UserMenu;
