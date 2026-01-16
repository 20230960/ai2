// exp_common.js
window.Exp = (function () {
  function getFileName() {
    const p = window.location.pathname;
    return p.substring(p.lastIndexOf("/") + 1);
  }

  function ensureAssigned() {
    const assignedUrl = sessionStorage.getItem("exp_condition_url");
    if (!assignedUrl) {
      window.location.replace("start.html");
      return false;
    }
    const current = getFileName();
    if (current !== assignedUrl) {
      // 防止被试手动改 URL 跳到别的条件
      window.location.replace(assignedUrl);
      return false;
    }
    return true;
  }

  function saveAndGoToSurvey({ interactionLog = [], final_state = {}, extra = {} } = {}) {
    sessionStorage.setItem("task_end_ts", new Date().toISOString());
    sessionStorage.setItem("interactionLog", JSON.stringify(interactionLog || []));
    sessionStorage.setItem("final_state", JSON.stringify(final_state || {}));
    sessionStorage.setItem("page_extra", JSON.stringify(extra || {}));
    window.location.href = "survey.html";
  }

  function getContextForSurvey() {
    return {
      participant_id: sessionStorage.getItem("participant_id"),
      condition: sessionStorage.getItem("exp_condition"),
      condition_url: sessionStorage.getItem("exp_condition_url"),
      task_start_ts: sessionStorage.getItem("task_start_ts"),
      task_end_ts: sessionStorage.getItem("task_end_ts"),
      interactionLog: JSON.parse(sessionStorage.getItem("interactionLog") || "[]"),
      final_state: JSON.parse(sessionStorage.getItem("final_state") || "{}"),
      page_extra: JSON.parse(sessionStorage.getItem("page_extra") || "{}"),
    };
  }

  return { ensureAssigned, saveAndGoToSurvey, getContextForSurvey };
})();
