export function packetProcessor(
  data: string,
): { versionSum: number; computation: number } {
  let binIdx = 0;
  let binData = hex2bin(data);

  const parentPacket: Packet = getPacket(binData, binIdx);
  binIdx += 6;
  if (parentPacket.isOperator()) {
    processOperator(binData, binIdx, parentPacket);
  } else {
    processType4Literal(binData, binIdx, parentPacket);
  }
  return {
    versionSum: versionSum(parentPacket),
    computation: computePackets(parentPacket),
  };
}

function versionSum(packet: Packet): number {
  let sum: number = packet.version;
  packet.subPackets.forEach((p) => {
    sum += versionSum(p);
  });
  return sum;
}

function computePackets(packet: Packet): number {
  if (packet.id == 0) {
    let sum = 0;
    packet.subPackets.forEach((p) => sum += computePackets(p));
    return sum;
  } else if (packet.id == 1) {
    let product = 1;
    packet.subPackets.forEach((p) => product *= computePackets(p));
    return product;
  } else if (packet.id == 2) {
    let min = Infinity;
    packet.subPackets.forEach((p) => min = Math.min(min, computePackets(p)));
    return min;
  } else if (packet.id == 3) {
    let max = -1;
    packet.subPackets.forEach((p) => max = Math.max(max, computePackets(p)));
    return max;
  } else if (packet.id == 4) {
    return packet.literalValue;
  } else if (packet.id == 5) {
    return computePackets(packet.subPackets[0]) >
        computePackets(packet.subPackets[1])
      ? 1
      : 0;
  } else if (packet.id == 6) {
    return computePackets(packet.subPackets[0]) <
        computePackets(packet.subPackets[1])
      ? 1
      : 0;
  } else if (packet.id == 7) {
    return computePackets(packet.subPackets[0]) ==
        computePackets(packet.subPackets[1])
      ? 1
      : 0;
  }
  throw new Error("Unexpected packet id: " + packet.id);
}

export function hex2bin(hex: string): string {
  return hex.split("").map((e) =>
    (parseInt(e, 16).toString(2)).padStart(4, "0")
  ).join("");
}

export function processType4Literal(
  binData: string,
  binIdx: number,
  packet: Packet,
): { newBinIdx: number } {
  let bits: string = "";
  while (true) {
    const group = binData.substr(binIdx, 5);
    binIdx += 5;
    bits += group.substr(1);
    if (group[0] == "0") { //no further bit groups
      packet.literalValue = parseInt(bits, 2);
      return { newBinIdx: binIdx };
    }
  }
}

export function processOperator(
  binData: string,
  binIdx: number,
  packet: Packet,
): { newBinIdx: number } {
  if (binData[binIdx] == "0") { // type ID = 0
    binIdx++;
    const subPacketsLen = parseInt(binData.substr(binIdx, 15), 2);
    binIdx += 15;
    let startPos = binIdx;
    while (startPos + subPacketsLen != binIdx) {
      binIdx = processSub(binData, binIdx, packet);
    }
  } else { // type ID = 1
    binIdx++;
    const numSubPackets = parseInt(binData.substr(binIdx, 11), 2);
    binIdx += 11;
    for (let i = 0; i < numSubPackets; i++) {
      binIdx = processSub(binData, binIdx, packet);
    }
  }
  return { newBinIdx: binIdx };
}

function processSub(binData: string, binIdx: number, packet: Packet): number {
  const subPacket: Packet = getPacket(binData, binIdx);
  binIdx += 6;
  if (subPacket.isOperator()) {
    binIdx = processOperator(binData, binIdx, subPacket).newBinIdx;
  } else {
    binIdx = processType4Literal(binData, binIdx, subPacket).newBinIdx;
  }
  packet.subPackets.push(subPacket);
  return binIdx;
}

function getPacket(binData: string, binIdx: number): Packet {
  const packetVer: number = parseInt(binData.substr(binIdx, 3), 2);
  const typeId: number = parseInt(binData.substr(binIdx + 3, 3), 2);
  return new Packet(packetVer, typeId);
}

export class Packet {
  version: number;
  id: number;
  literalValue: number = 0;
  subPackets: Packet[] = [];
  constructor(ver: number, id: number) {
    this.version = ver;
    this.id = id;
  }
  isOperator() {
    return this.id != 4;
  }
}
