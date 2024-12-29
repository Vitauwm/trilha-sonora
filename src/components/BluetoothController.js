import React, { useState } from "react";

const BluetoothController = () => {
  const [status, setStatus] = useState("Desconectado");
  const [characteristic, setCharacteristic] = useState(null);

  const connectToDevice = async () => {
    try {
      setStatus("Buscando dispositivo...");

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ["12345678-1234-1234-1234-123456789abc"],
      });

      console.log("Dispositivo encontrado:", device.name || "Sem Nome");
      setStatus(`Conectando ao GATT Server de ${device.name || "dispositivo"}...`);

      const server = await device.gatt.connect();
      const service = await server.getPrimaryService("12345678-1234-1234-1234-123456789abc");
      console.log("Serviço obtido:", service);

      const char = await service.getCharacteristic("87654321-4321-4321-4321-abc123456789");
      console.log("Característica conectada:", char);

      setCharacteristic(char);
      setStatus("Conectado e pronto para enviar comandos!");
    } catch (error) {
      console.error("Erro ao conectar:", error.message);
      setStatus(`Erro ao conectar: ${error.message}`);
    }
  };

  const disconnectDevice = () => {
    if (characteristic?.service?.device?.gatt?.connected) {
      console.log("Desconectando do dispositivo...");
      characteristic.service.device.gatt.disconnect();
      setStatus("Desconectado com sucesso.");
      setCharacteristic(null);
    } else {
      setStatus("Nenhum dispositivo conectado ou já desconectado.");
    }
  };

  const sendCommand = async (command) => {
    if (!characteristic) {
      alert("Conecte-se ao dispositivo primeiro!");
      return;
    }

    try {
      console.log("Enviando comando:", command);
      await characteristic.writeValue(new Uint8Array(command));
      setStatus("Comando enviado com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar comando:", error.message);
      setStatus(`Erro ao enviar comando: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Controle Bluetooth</h2>
      <p>Status: {status}</p>
      <button onClick={connectToDevice}>Conectar ao Dispositivo</button>
      <button onClick={disconnectDevice} style={{ marginLeft: "10px" }}>
        Desconectar
      </button>
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => sendCommand([0x02, 255, 0, 0])}>Cor Vermelha</button>
        <button onClick={() => sendCommand([0x02, 0, 255, 0])}>Cor Verde</button>
        <button onClick={() => sendCommand([0x02, 0, 0, 255])}>Cor Azul</button>
        <button onClick={() => sendCommand([0x01])}>Desligar</button>
      </div>
    </div>
  );
};

export default BluetoothController;
