const express = require('express');
const soap = require('soap');
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'soap_db',
    password: 'Keyshar799',
    port: 5432,
});

const app = express();

const wsdl = `
<definitions name="CheckAvailabilityService"
             targetNamespace="http://example.com/checkAvailability"
             xmlns="http://schemas.xmlsoap.org/wsdl/"
             xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
             xmlns:tns="http://example.com/checkAvailability"
             xmlns:xsd="http://www.w3.org/2001/XMLSchema">
  <types>
    <xsd:schema targetNamespace="http://example.com/checkAvailability">
      <xsd:element name="checkAvailabilityRequest">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="startDate" type="xsd:string"/>
            <xsd:element name="endDate" type="xsd:string"/>
            <xsd:element name="roomType" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
      <xsd:element name="checkAvailabilityResponse">
        <xsd:complexType>
          <xsd:sequence>
            <xsd:element name="rooms" type="xsd:string"/>
          </xsd:sequence>
        </xsd:complexType>
      </xsd:element>
    </xsd:schema>
  </types>
  <message name="checkAvailabilityRequest">
    <part name="parameters" element="tns:checkAvailabilityRequest"/>
  </message>
  <message name="checkAvailabilityResponse">
    <part name="parameters" element="tns:checkAvailabilityResponse"/>
  </message>
  <portType name="CheckAvailabilityPortType">
    <operation name="checkAvailability">
      <input message="tns:checkAvailabilityRequest"/>
      <output message="tns:checkAvailabilityResponse"/>
    </operation>
  </portType>
  <binding name="CheckAvailabilityBinding" type="tns:CheckAvailabilityPortType">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <operation name="checkAvailability">
      <soap:operation soapAction="checkAvailability"/>
      <input>
        <soap:body use="literal"/>
      </input>
      <output>
        <soap:body use="literal"/>
      </output>
    </operation>
  </binding>
  <service name="CheckAvailabilityService">
    <port name="CheckAvailabilityPort" binding="tns:CheckAvailabilityBinding">
      <soap:address location="http://localhost:8001/wsdl"/>
    </port>
  </service>
</definitions>
`;

const service = {
    CheckAvailabilityService: {
        CheckAvailabilityPort: {
            checkAvailability: async ({ startDate, endDate, roomType }) => {
                const { rows } = await pool.query(
                    `SELECT * FROM availability WHERE room_type = $1 AND available_date BETWEEN $2 AND $3 AND status = 'available'`,
                    [roomType, startDate, endDate]
                );
                return { rooms: JSON.stringify(rows) };
            },
        },
    },
};

app.listen(8001, () => {
    const soapServer = soap.listen(app, '/wsdl', service, wsdl);
    console.log('SOAP Service running at http://localhost:8001/wsdl');
});
