import Image from "next/image";

/** Small CIBS emblem shown in the admin panel navigation. */
export function Icon() {
  return (
    <span
      style={{
        display: "grid",
        placeItems: "center",
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "#fffdf8",
        boxShadow: "0 0 0 1.5px rgba(193,154,52,0.5)",
      }}
    >
      <Image src="/images/cibs-logo.png" alt="CIBS" width={20} height={18} style={{ height: 18, width: "auto" }} />
    </span>
  );
}

export default Icon;
