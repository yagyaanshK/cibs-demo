import Image from "next/image";

/**
 * Login-screen branding for the CIBS admin panel.
 *
 * The emblem sits on a cream disc so it reads correctly against both the light
 * and dark Payload themes.
 */
export function Logo() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
        padding: "0.5rem 0 1.5rem",
      }}
    >
      <span
        style={{
          display: "grid",
          placeItems: "center",
          width: 84,
          height: 84,
          borderRadius: "50%",
          background: "#fffdf8",
          boxShadow: "0 0 0 3px rgba(193,154,52,0.45)",
        }}
      >
        <Image src="/images/cibs-logo.png" alt="CIBS emblem" width={60} height={53} style={{ height: 56, width: "auto" }} />
      </span>
      <span style={{ textAlign: "center", lineHeight: 1.3 }}>
        <strong style={{ display: "block", fontSize: "1.35rem", letterSpacing: "-0.01em" }}>
          CIBS Website Admin
        </strong>
        <span style={{ display: "block", fontSize: "0.8rem", opacity: 0.7, marginTop: 4 }}>
          Central Institute of Buddhist Studies · Choglamsar, Leh
        </span>
      </span>
    </div>
  );
}

export default Logo;
