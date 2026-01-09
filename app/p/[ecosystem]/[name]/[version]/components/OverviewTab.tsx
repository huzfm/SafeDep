export function OverviewTab() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-3xl space-y-10 mt-10">
        <div className="border-l-4 border-teal-500 pl-6 py-2">
          <h3 className="font-bold text-black text-xl mb-3">Summary</h3>

          <p className="text-[15px] text-slate-700 leading-relaxed mb-2">
            This analysis was performed using vul and SafeDep Cloud Malicious
            Package Analysis. Integrate with GitHub using vul-action GitHub
            Actions.
          </p>

          <p className="text-sm text-slate-600 font-semibold text-[15px]">
            Note: This report is updated by a verification record
          </p>

          <p className="text-sm text-slate-700 mt-3 text-[15px]">
            Multiple files flagged for potential data exfiltration, XSS, and RCE
            vulnerabilities. High confidence of malicious intent due to combined
            factors.
          </p>
        </div>

        <div className="border-l-4 border-slate-300 pl-6 py-2">
          <h3 className="font-bold text-black text-xl mb-3">
            Verification Record
          </h3>

          <p className="text-sm text-slate-600 font-semibold text-[15px]">
            Note: Manual analysis confirmed that the package is clean.
          </p>
        </div>

        <div className="border-l-4 border-slate-300 pl-6 py-2">
          <h3 className="font-bold text-black text-xl mb-3">Details</h3>

          <p className="text-sm text-slate-600 font-semibold text-[15px]">
            Note: This report is updated by a verification record
          </p>

          <p className="text-sm text-slate-700 mt-3 leading-relaxed text-[15px]">
            The package exhibits multiple concerning behaviors. Several files
            match the &apos;sys_net_recon.xml&apos; YARA rule, suggesting
            potential system and network information exfiltration. Additionally,
            the code constructs JavaScript URLs and assigns them to formElement
            attributes, which can lead to XSS if user-controlled data is
            involved. Furthermore, dynamic code execution is possible via
            formatDynamicImportPath if the CacheHandlers configuration is
            compromised. These factors, combined, indicate malicious intent.
          </p>
        </div>
      </div>
    </div>
  );
}
