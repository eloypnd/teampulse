import { Box, Container, Flex, Link } from "@chakra-ui/react";
import { LuExternalLink } from "react-icons/lu";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Flex direction="column" minH="100vh">
        <Box as="header" py={4} boxShadow="sm">
          <Container maxW="container.xl">
            <Flex justify="space-between" align="center">
              <Box fontWeight="bold" as="h1">
                ⚡️ TeamPulse
              </Box>
            </Flex>
          </Container>
        </Box>
        <Box flex="1" py={8}>
          <Container maxW="container.xl">{children}</Container>
        </Box>
        <Box as="footer" py={4}>
          <Container maxW="container.xl">
            <Box textAlign="center" color="gray.600">
              Made with ❤️ by{" "}
              <Link
                href="https://eloy.website"
                target="_blank"
                rel="noreferrer"
              >
                Eloy Pineda <LuExternalLink />
              </Link>{" "}
              - {new Date().getFullYear()}
            </Box>
          </Container>
        </Box>
      </Flex>
    </Box>
  );
};

export default Layout;
