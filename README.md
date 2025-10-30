# 🎓 Plataforma de Cursos Descentralizada con Blockchain y Web3

## 🌐 Descripción General

La **Plataforma de Cursos con Blockchain y Web3** es una solución educativa descentralizada que utiliza la red **Stellar** para ofrecer transparencia, seguridad y control total tanto a creadores de contenido como a estudiantes.

El objetivo principal es eliminar intermediarios en la distribución de cursos, garantizar pagos directos y ofrecer **certificados NFT verificables**, impulsando la **inclusión financiera** mediante el uso de tecnología blockchain.

---

## 🚨 Problemática Actual

Las plataformas educativas tradicionales presentan diversos problemas:

- Falta de **transparencia** en la distribución de ingresos.  
- **Centralización** del control sobre datos, certificados y pagos.  
- Riesgo de **duplicidad o falsificación** de certificados.  
- **Pérdida de propiedad intelectual** por parte de los autores.  
- **Pagos lentos o con comisiones altas** a los creadores de cursos.

---

## 💡 Solución Propuesta

Nuestra plataforma descentralizada basada en **Blockchain y Web3 (Stellar)** aborda estas limitaciones mediante:

- **Smart Contracts** que automatizan pagos y asignación de acceso.  
- **Tokens** que representan la propiedad digital de cada curso.  
- **NFTs** como certificados de finalización únicos e inmutables.  
- **Pagos directos** entre estudiante y creador, sin intermediarios.  
- **Registro transparente** de transacciones y propiedad en la blockchain.

---

## 🎯 Objetivos del Proyecto

- Promover la **descentralización** en la educación digital.  
- Asegurar **pagos justos y directos** entre estudiantes y autores.  
- Ofrecer **certificados NFT únicos y verificables**.  
- Impulsar la **inclusión financiera** mediante Stellar.  
- Fomentar la **propiedad intelectual digital** de los cursos.

---

## ⚙️ Funcionamiento General

1. 📤 **Subida del curso:**  
   El creador publica su curso en la plataforma y define su precio en tokens Stellar (XLM o tokens personalizados).

2. 💳 **Compra del curso:**  
   El estudiante realiza una transacción blockchain usando su wallet conectada (por ejemplo, **Freighter Wallet** o **Stellar Laboratory**).

3. 🤖 **Ejecución del Smart Contract:**  
   El contrato inteligente distribuye el pago automáticamente al creador y genera un **token de acceso** al curso para el estudiante.

4. 🧠 **Completación del curso:**  
   Al finalizar el curso, el sistema emite un **NFT certificado** en la wallet del estudiante, funcionando como prueba verificable en la red Stellar.

5. 🔐 **Transparencia total:**  
   Toda la información (pagos, accesos y certificados) queda registrada en la blockchain, garantizando trazabilidad y confianza.

---

## 🛠️ Tecnologías Utilizadas

| Componente | Tecnología |
|-------------|-------------|
| Blockchain | **Stellar Network** |
| Smart Contracts | **Soroban (Stellar Smart Contracts)** |
| Frontend | **React / Next.js** + **TailwindCSS** |
| Web3 Integración | **Stellar SDK / Soroban SDK** |
| Backend | **Node.js / Express** |
| Base de datos (opcional) | **MongoDB / PostgreSQL** |
| NFT Metadata | **IPFS (InterPlanetary File System)** |

---

## 📁 Estructura del Proyecto

```
📦 stellar-courses-platform
📂 backend
├── server.js
├── routes/
├── controllers/
└── smart-contracts/
📂 frontend
├── src/
├── components/
├── pages/
└── hooks/
📜 README.md
```

---

## 🧩 Integración con Stellar

El proyecto utiliza la **blockchain de Stellar** y el sistema **Soroban** para manejar los contratos inteligentes:

- **Creación de Tokens:**  
  Cada curso está representado por un token único que otorga acceso al contenido.

- **Certificados NFT:**  
  Se generan como tokens no fungibles (NFTs) al finalizar un curso, asociados al ID del estudiante y el hash del certificado.

- **Pagos:**  
  Los pagos se realizan directamente en XLM o tokens propios, gestionados por smart contracts en Stellar.


---

## 🌍 Beneficios Clave

✅ **Propiedad digital garantizada**: los tokens y NFTs pertenecen al usuario, no a la plataforma.  
✅ **Pagos instantáneos y sin intermediarios.**  
✅ **Transparencia total**: toda transacción es pública y verificable.  
✅ **Certificados inmutables y verificables.**  
✅ **Fomento a la educación descentralizada e inclusiva.**

---

## 🚀 Futuras Mejoras

- Implementación de un **sistema de reputación** basado en blockchain.  
- **Marketplace descentralizado** de cursos y certificaciones.  
- Integración con **Stellar Anchor Services** para pagos fiat.  
- Generación dinámica de **NFTs visuales** con metadata personalizada.

---

## 👥 Equipo de Desarrollo

**Proyecto para Hackathon — Plataforma de Educación Descentralizada**  
Desarrollado por:  
- Aldrick Emiliano Chavarría Ibarra  
- Jhafet Jonatan Rodríguez García
- Jesús Gerardo Toledo Ramirez
- Karla Janel Jimenez Martinez
- Anette Michelle Sánchez López

---

## 💬 Contribuciones

¡Las contribuciones son bienvenidas!  
Puedes abrir un **issue** o enviar un **pull request** con mejoras en el código, documentación o ideas para nuevas funciones.

---

> 🌟 *“La educación del futuro será libre, descentralizada y gobernada por sus propios creadores.”*
