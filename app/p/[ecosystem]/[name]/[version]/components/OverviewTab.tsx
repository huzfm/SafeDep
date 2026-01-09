export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="border-l-4 border-teal-500 pl-4">
        <h3 className="font-semibold text-slate-900 text-sm mb-2">Summary</h3>
        <p className="text-sm text-teal-600 mb-2 ">
          This analysis was performed using vul and SafeDep Cloud Malicious
          Package Analysis. Integrate with GitHub using vul-action GitHub
          Actions.
        </p>
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Note:</span> This report is updated by
          a verification record
        </p>
        <p className="text-sm text-slate-700 mt-2">
          Multiple files flagged for potential data exfiltration, XSS, and RCE
          vulnerabilities. High confidence of malicious intent due to combined
          factors.
        </p>
      </div>

      <div className="border-l-4 border-slate-300 pl-4">
        <h3 className="font-semibold text-slate-900 text-sm mb-2">
          Verification Record
        </h3>
        <p className="text-sm text-slate-700">
          Manual analysis confirmed that the package is clean.
        </p>
      </div>

      <div className="border-l-4 border-slate-300 pl-4">
        <h3 className="font-semibold text-slate-900 text-sm mb-2">Details</h3>
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Note:</span> This report is updated by
          a verification record
        </p>
        <p className="text-sm text-slate-700 mt-2">
          The package exhibits multiple concerning behaviors. Several files
          match the &apos;sys_net_recon.xml&apos; YARA rule, suggesting
          potential system and network information exfiltration. Additionally,
          the code constructs JavaScript URLs and assigns them to formElement
          attributes, which can lead to XSS if user-controlled data is involved.
          Furthermore, dynamic code execution is possible via
          formatDynamicImportPath if the CacheHandlers configuration is
          compromised. These factors, combined, indicate malicious intent.
        </p>
      </div>
    </div>
  );
}
