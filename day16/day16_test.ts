import { assertEquals } from "https://deno.land/std@0.117.0/testing/asserts.ts";
import {
  hex2bin,
  Packet,
  packetProcessor,
  processType4Literal,
} from "./day16.ts";

Deno.test({
  name: "hex to binary",
  fn() {
    assertEquals(
      hex2bin("8A004A801A8002F478"),
      "100010100000000001001010100000000001101010000000000000101111010001111000",
    );
  },
});

Deno.test({
  name: "Literal type 4 parsing",
  fn() {
    const packet = new Packet(1, 1);
    processType4Literal("101111111000101000", 0, packet);
    assertEquals(packet.literalValue, 2021);
  },
});

Deno.test({
  name: "Part 1 test",
  fn() {
    assertEquals(packetProcessor("8A004A801A8002F478").versionSum, 16);
    assertEquals(packetProcessor("620080001611562C8802118E34").versionSum, 12);
    assertEquals(
      packetProcessor("C0015000016115A2E0802F182340").versionSum,
      23,
    );
    assertEquals(
      packetProcessor("A0016C880162017C3686B18A3D4780").versionSum,
      31,
    );
  },
});

Deno.test({
  name: "Part 2 test",
  fn() {
    assertEquals(packetProcessor("C200B40A82").computation, 3);
    assertEquals(packetProcessor("04005AC33890").computation, 54);
    assertEquals(packetProcessor("880086C3E88112").computation, 7);
    assertEquals(packetProcessor("CE00C43D881120").computation, 9);
    assertEquals(packetProcessor("D8005AC2A8F0").computation, 1);
    assertEquals(packetProcessor("F600BC2D8F").computation, 0);
    assertEquals(packetProcessor("9C005AC2F8F0").computation, 0);
    assertEquals(packetProcessor("9C0141080250320F1802104A08").computation, 1);
  },
});

//3  100 (version 4)
//6  010 (type 2, operator)
//7  1 (type id 1)
//18 00000000001 (1 sub packet)
//21   001 (version 1)
//24   010 (type 2, operator)
//25   1 (type id 1)
//36   00000000001 (1 sub packet)
//39     101 (version 5)
//42     010 (type 2, operator)
//43     0 (type id 0)
//58     000000000001011 (11 bits in subpackets)
//61     110 (version 6)
//64     100 (type 4, literal)
//69     01111
//72     000

// 3 011 (version 3)
// 6 000 (type 0, operator)
// 7 1 (type id 1)
// 18 00000000010 (2 subpackets)

//21 000 v0 (sub packet 1)
//24 000 t0 op
//25 0 tid 0
//40 000000000010110 (15 bits, length 22)

//43 000 v0
//46 100 type 4 literal
//47 0 stop literal
//51 1010 literal value

// 54 101 v5
// 57 100 type 4 literal
// 58 0 stop
// 62 1011 literal value

// 001 v1
// 000 type 0 operator
// 1 (type id 1)
// 00000000010 (2 subpackets)

// 000 v0
// 100 t4
// 0 stop
// 1100 (literal value)

// 011 v3
// 100 t4
// 0 stop
// 1101 literal value
// 00 end padding
