"use client";

import {
  Divider,
  Paper,
  ScrollArea,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";

interface IWelcomeCards {
  name: string;
}

export const WelcomeCards = ({ name }: IWelcomeCards) => {
  return (
    <Paper className="p-5">
      <Stack>
        <Text className="font-medium text-2xl">
          Selamat Datang <span className="font-bold">{name}!</span>
        </Text>
      </Stack>
    </Paper>
  );
};

const elements = [
  {
    kcontact: "CZX1633",
    name: "Hadyan Arif",
    phone: "08123456789",
    time: new Date().toLocaleString(),
    detail: '#'
  },
];

export const AttendanceListCards = () => {
  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.kcontact}</td>
      <td>{element.name}</td>
      <td>{element.phone}</td>
      <td>{element.time}</td>
      <td><a href={element.detail}>Lihat Detail</a></td>
    </tr>
  ));
  return (
    <div>
      <Stack>
        <Title order={3}>Daftar Absensi Hari Ini {new Date().toLocaleString()}</Title>
        <ScrollArea type="hover" h={250}>
          <Table>
            <thead>
              <tr>
                <th>K-Contact</th>
                <th>Nama</th>
                <th>Nomor Telepon</th>
                <th>Time</th>
                <th>Lihat Detail</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </ScrollArea>
      </Stack>
    </div>
  );
};
