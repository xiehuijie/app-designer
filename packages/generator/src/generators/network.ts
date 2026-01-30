import type * as T from '@app-designer/types'

/**
 * 生成 z.string().ip() 代码 (IPv4)
 * 如果配置了 mode/range，则在基础 IP 校验上增加范围过滤
 */
export function generateIPv4(type: T.IPv4): string {
  const base = 'z.string().ip({ version: "v4" })'

  // 如果没有配置范围，保持原有行为
  const ranges = (type as any).range as unknown
  if (!Array.isArray(ranges) || ranges.length === 0) {
    return base
  }

  const mode = (type as any).mode ?? 'allow'
  const rangesLiteral = JSON.stringify(ranges)
  const modeLiteral = JSON.stringify(mode)

  // 生成带有范围过滤的 zod 表达式
  return (
    base +
    `.superRefine((val, ctx) => {
      const ipToNum = (ip) => {
        const parts = ip.split(".");
        if (parts.length !== 4) return NaN;
        let num = 0;
        for (let i = 0; i < 4; i++) {
          const part = Number(parts[i]);
          if (!Number.isInteger(part) || part < 0 || part > 255) return NaN;
          num = (num << 8) + part;
        }
        return num >>> 0;
      };

      const ipNum = ipToNum(val);
      if (!Number.isFinite(ipNum)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid IPv4 address" });
        return;
      }

      const ranges = ${rangesLiteral};
      const inRanges = ranges.some((r) => {
        if (typeof r !== "string") return false;

        // CIDR 表达式，例如 192.168.0.0/16
        if (r.includes("/")) {
          const [baseIp, prefix] = r.split("/");
          const maskBits = Number(prefix);
          if (!Number.isInteger(maskBits) || maskBits < 0 || maskBits > 32) return false;
          const baseNum = ipToNum(baseIp);
          if (!Number.isFinite(baseNum)) return false;
          const mask = maskBits === 0 ? 0 : (~0 << (32 - maskBits)) >>> 0;
          return (ipNum & mask) === (baseNum & mask);
        }

        // 简单范围表达式: start-end
        if (r.includes("-")) {
          const [startIp, endIp] = r.split("-");
          const startNum = ipToNum(startIp);
          const endNum = ipToNum(endIp);
          if (!Number.isFinite(startNum) || !Number.isFinite(endNum)) return false;
          return ipNum >= startNum && ipNum <= endNum;
        }

        // 精确匹配
        return val === r;
      });

      const mode = ${modeLiteral};
      const allow = mode === "allow";

      if ((allow && !inRanges) || (!allow && inRanges)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "IP address is not in the allowed range",
        });
      }
    })`
  )
}

/**
 * 生成 z.string().ip() 代码 (IPv6)
 */
export function generateIPv6(_type: T.IPv6): string {
  return 'z.string().ip({ version: "v6" })'
}

/**
 * 生成 CIDR v4 验证代码
 */
export function generateCIDRv4(_type: T.CIDRv4): string {
  return 'z.string().cidr({ version: "v4" })'
}

/**
 * 生成 CIDR v6 验证代码
 */
export function generateCIDRv6(_type: T.CIDRv6): string {
  return 'z.string().cidr({ version: "v6" })'
}

/**
 * 生成 MAC 地址验证代码
 */
export function generateMAC(type: T.MAC): string {
  const baseSchema = 'z.string().regex(/^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/)';

  const mode = (type as any).mode;
  const range = (type as any).range;

  if (!mode || !Array.isArray(range) || range.length === 0) {
    return baseSchema;
  }

  const rangeLiteral = JSON.stringify(range);

  if (mode === 'allow') {
    return `${baseSchema}.refine((value) => ${rangeLiteral}.includes(value))`;
  }

  if (mode === 'deny') {
    return `${baseSchema}.refine((value) => !${rangeLiteral}.includes(value))`;
  }

  return baseSchema;
}
