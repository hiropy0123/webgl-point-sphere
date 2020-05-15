// get GPU drirver name
export function getGpuName(): string {
  const canvas = document.createElement("canvas");
  let gl;
  let renderer: string;

  try {
    gl = canvas.getContext("webgl");

    // get driver info
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");

    if (!ext) {
      renderer = "";
    } else {
      renderer = gl?.getParameter(ext.UNMASKED_RENDERER_WEBGL);
    }

  } catch (error) {
    gl = null;
    renderer = "";
  }

  // return driver
  return renderer
}