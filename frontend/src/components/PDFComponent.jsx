import { Document, Image, Page, Text, View } from "@react-pdf/renderer";
import logo from "../assets/logo.png";


const PDF = () => {

  return (
    <Document>
      <Page size="A4">
        {/* Paper */}
        <View style={{ width: "100vw", height: "100vh", padding: "16px", fontFamily: "Helvetica" }}>
          {/* Header */}
          <View style={{ width: "100%", height: "13vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", border: "1px solid red" }}>

            {/* Group */}
            <View style={{ width: "28%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", border: "1px solid red" }}>
              <Image style={{ width: "64px", height: "64px" }} src={logo} />
            </View>

            <View style={{ width: "47%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "8px", border: "1px solid red" }}>
              <Text style={{ fontSize: "11px", fontFamily: "Helvetica-Bold" }}>H Y M HEALTHCARE SA DE CV</Text>
              <Text style={{ fontSize: "11px", fontFamily: "Helvetica-Bold" }}>HMH210819114</Text>
              <Text style={{ fontSize: "12px", color: "#0070bd" }}>COTIZACIÓN</Text>
            </View>

            <View style={{ width: "25%", border: "1px solid red", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", height: "50%" }}>
              <Text style={{ fontSize: "11px", fontFamily: "Helvetica-Bold" }}>FOLIO: <Text style={{ fontFamily: "Helvetica", color: "red" }}>1337</Text></Text>
              <Text style={{ fontSize: "11px" }}>FECHA: 27/05/2023</Text>
            </View>
          </View>

          {/* Body */}
          <View style={{ width: "100%", height: "55vh", display: "flex", flexDirection: "column", justifyContent: "flex-start", alignItems: "flex-start", border: "1px solid red" }}>
            <Text style={{ fontSize: "12px" }} >Dr. Ariana Alejandra Rivera Cruz</Text>

            {/* Table */}
            <View style={{
              display: "table",
              width: "auto",
              borderStyle: "solid",
              borderWidth: 1,
              borderRightWidth: 0,
              borderBottomWidth: 0
            }}>

              { /* Table Row */}
              <View style={{
                margin: "auto",
                flexDirection: "row"
              }}>

                { /* Table Col */}
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>

                  { /* Table Cell */}
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 11,
                    fontFamily: "Helvetica-Bold"
                  }}>CANTIDAD</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 11,
                    fontFamily: "Helvetica-Bold"
                  }}>PRODUCTO</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 11,
                    fontFamily: "Helvetica-Bold"
                  }}>PRECIO UNITARIO (MXN)</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 11,
                    fontFamily: "Helvetica-Bold"
                  }}>PRECIO TOTAL (MXN)</Text>
                </View>
              </View>

              { /* Table Row */}
              <View style={{
                margin: "auto",
                flexDirection: "row"
              }}>

                { /* Table Col */}
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>

                  { /* Table Cell */}
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>1</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>ULTRASONIDO CHISON ECO 3 EXPERT</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>$ 72,500.00</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>$72,500.00</Text>
                </View>
              </View>

              { /* Table Row */}
              <View style={{
                margin: "auto",
                flexDirection: "row"
              }}>

                { /* Table Col */}
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>

                  { /* Table Cell */}
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>1</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>TRANSDUCTOR CONVEXO PARA CHISON ECO 3 EXPERT</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>$0</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>$0</Text>
                </View>
              </View>

              { /* Table Row */}
              <View style={{
                margin: "auto",
                flexDirection: "row"
              }}>

                { /* Table Col */}
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>

                  { /* Table Cell */}
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>1</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>TRANSDUCTOR LINEAL PARA CHISON ECO 3 EXPERT</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>$24,137.00</Text>
                </View>
                <View style={{
                  width: "25%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderLeftWidth: 0,
                  borderTopWidth: 0
                }}>
                  <Text style={{
                    margin: "auto",
                    marginTop: 5,
                    fontSize: 10
                  }}>$24,137.00</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Footer */}
          <View style={{ width: "100%", height: "25vh", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", border: "1px solid red", gap: "8px" }}>

            {/* First section */}
            <view style={{ width: "57%", height: "45%", border: "1px solid red", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start" }} >
              <Text style={{ fontSize: "11px" }}>OBSERVACIONES: Cotización Contado</Text>

              <View style={{ border: "1px solid red" }} >
                <Text style={{ fontSize: "11px" }}>GARANTÍA</Text>
                <Text style={{ fontSize: "8px" }}>.*18 Meses de Garantía en Equipo de Ultrasonido Chison Nuevo (Unidad principal); **12 Meses de Garantía en Transductores Chison Nuevos; ***12 Meses de Garantía en Batería integrada al equipo; ****Impresoras, reguladores y accesorios la garantía es directo con fabricante.</Text>
              </View>
            </view>

            {/* Billing section */}
            <View style={{ width: "43%", height: "45%", border: "1px solid red"/* , display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-start" */, gap: "8px" }}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "11px", fontFamily: "Helvetica-Bold" }}>SUBTOTAL</Text>
                <Text style={{ fontSize: "11px" }}>$96,638.00</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "11px", fontFamily: "Helvetica-Bold" }}>IVA</Text>
                <Text style={{ fontSize: "11px" }}>$15,462.00</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "11px", fontFamily: "Helvetica-Bold" }}>COSTO DE ENTREGA</Text>
                <Text style={{ fontSize: "11px" }}>$700.00</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <Text style={{ fontSize: "11px", fontFamily: "Helvetica-Bold" }}>TOTAL</Text>
                <Text style={{ fontSize: "11px" }}>$112,800.00</Text>
              </View>

            </View>
          </View>

          <View style={{ width: "100%", height: "7vh", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center", border: "1px solid red" }}>

            {/* Validity */}
            <Text style={{ fontSize: "8px" }}>COTIZACIÓN CON VALIDEZ DE 7 DÍAS POSTERIOR A LA FECHA DE EMISIÓN</Text>
          </View>
        </View>
      </Page >
    </Document >
  );
}

export default PDF;
