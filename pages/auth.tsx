import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { GiDeliveryDrone } from "react-icons/gi";

export default function AuthenticationTitle() {
  return (
    <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 800,
        })}
      >
        Ground Control Station
      </Title>
      <Group position="center" className="w-full">
        <GiDeliveryDrone size={180} className="text-blue-500" />
      </Group>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput label="Username" placeholder="username" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Button
          fullWidth
          mt="xl"
          className="btn bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}
