(function () {
  const modals = Array.from(document.querySelectorAll('.modal[id$="cartaModal"]'));
  if (!modals.length) return;

  const programName = document.title.trim();

  function getColumnKey(header) {
    const normalized = header
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    if (normalized.includes('proposito')) return 'proposito';
    if (normalized.includes('tiempo')) return 'tiempo';
    if (normalized.includes('aprendizaje')) return 'aprendizaje';
    if (normalized.includes('tematica')) return 'tematica';
    if (normalized.includes('estrategia')) return 'estrategiasSugeridas';
    return '';
  }

  function getCellText(cell) {
    const blockTags = new Set(['BLOCKQUOTE', 'DIV', 'H1', 'H2', 'H3', 'H4', 'LI', 'OL', 'P', 'UL']);
    const parts = [];

    function collect(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        parts.push(node.nodeValue);
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      if (node.tagName === 'BR') {
        parts.push('\n');
        return;
      }

      const isBlock = blockTags.has(node.tagName);
      if (isBlock && parts.length && !parts[parts.length - 1].endsWith('\n')) {
        parts.push('\n');
      }
      Array.from(node.childNodes).forEach(collect);
      if (isBlock) parts.push('\n');
    }

    collect(cell);
    return parts.join('')
      .replace(/[ \t]*\n[ \t]*/g, '\n')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  }

  function readTableData(content) {
    const result = {
      proposito: '',
      tiempo: '',
      aprendizajes: []
    };

    content.querySelectorAll('table').forEach((table) => {
      const headers = Array.from(table.querySelectorAll('thead th')).map((header) => (
        getColumnKey(header.innerText.trim())
      ));
      if (!headers.length) return;

      const isPurposeTable = headers.includes('proposito') || headers.includes('tiempo');
      const isLearningTable = headers.includes('aprendizaje')
        || headers.includes('tematica')
        || headers.includes('estrategiasSugeridas');
      if (!isPurposeTable && !isLearningTable) return;

      table.querySelectorAll('tbody tr').forEach((row) => {
        const values = {};
        let columnIndex = 0;
        Array.from(row.children).forEach((cell) => {
          const value = getCellText(cell);
          const span = cell.colSpan || 1;
          if (span > 1) {
            values.tematica = value;
          } else {
            const key = headers[columnIndex];
            if (key) values[key] = value;
          }
          columnIndex += span;
        });

        if (isPurposeTable) {
          if (values.proposito) result.proposito = values.proposito;
          if (values.tiempo) result.tiempo = values.tiempo;
        } else {
          const aprendizaje = {
            aprendizaje: values.aprendizaje || '',
            tematica: values.tematica || '',
            estrategiasSugeridas: values.estrategiasSugeridas || ''
          };
          if (Object.values(aprendizaje).some(Boolean)) {
            result.aprendizajes.push(aprendizaje);
          }
        }
      });
    });

    return result;
  }

  const letters = modals.map((modal) => {
    const body = modal.querySelector('.modal-body');
    const title = modal.querySelector('.modal-title')?.textContent.trim() || modal.id;
    const headings = body
      ? Array.from(body.querySelectorAll('h3')).filter((heading) => /^Unidad\s+\d+\b/i.test(heading.textContent.trim()))
      : [];
    const units = headings.map((heading, index) => {
      const range = document.createRange();
      range.setStartBefore(heading);
      if (headings[index + 1]) {
        range.setEndBefore(headings[index + 1]);
      } else {
        range.setEnd(body, body.childNodes.length);
      }

      const content = document.createElement('div');
      content.append(range.cloneContents());
      const match = heading.textContent.trim().match(/^Unidad\s+(\d+)/i);
      const tableData = readTableData(content);
      return {
        numero: match ? Number(match[1]) : null,
        titulo: heading.textContent.trim(),
        ...tableData,
        contenidoHtml: content.innerHTML.trim(),
        contenidoTexto: content.innerText.trim()
      };
    });

    return {
      titulo: title,
      contenidoHtml: body ? body.innerHTML.trim() : '',
      unidades: units
    };
  });

  function makeDownloadIcon(label, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.title = label;
    button.setAttribute('aria-label', label);
    button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>';
    return button;
  }

  function makeCopyIcon(label, className) {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.title = label;
    button.setAttribute('aria-label', label);
    button.innerHTML = '<svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/></svg>';
    return button;
  }

  function filenamePart(value) {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  function downloadJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function copyJson(data, button, label) {
    const text = JSON.stringify(data, null, 2);
    const copiedLabel = 'JSON copiado al portapapeles';

    function showCopied() {
      button.title = copiedLabel;
      button.setAttribute('aria-label', copiedLabel);
      window.setTimeout(() => {
        button.title = label;
        button.setAttribute('aria-label', label);
      }, 2500);
    }

    function fallbackCopy() {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', '');
      textarea.style.cssText = 'position:fixed;left:-9999px;top:0';
      document.body.append(textarea);
      textarea.select();
      const copied = document.execCommand('copy');
      textarea.remove();
      return copied;
    }

    function showFailure() {
      const message = 'No se pudo copiar el JSON al portapapeles.';
      button.title = message;
      button.setAttribute('aria-label', message);
      window.alert(message);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showCopied, () => {
        if (fallbackCopy()) showCopied();
        else showFailure();
      });
    } else if (fallbackCopy()) {
      showCopied();
    } else {
      showFailure();
    }
  }

  letters.forEach((letter, index) => {
    letter.unidades.forEach((unit) => {
      const heading = Array.from(modals[index].querySelectorAll('.modal-body h3'))
        .find((candidate) => candidate.textContent.trim() === unit.titulo);
      if (!heading) return;

      const downloadLabel = `Exportar ${unit.titulo} en JSON`;
      const copyLabel = `Copiar ${unit.titulo} en JSON al portapapeles`;
      const downloadButton = makeDownloadIcon(
        downloadLabel,
        'btn btn-sm btn-outline-secondary ms-2 carta-export-unit'
      );
      const copyButton = makeCopyIcon(
        copyLabel,
        'btn btn-sm btn-outline-secondary ms-1 carta-copy-unit'
      );
      const data = {
        programa: programName,
        cartaDescriptiva: letter.titulo,
        unidad: unit
      };

      downloadButton.addEventListener('click', () => {
        downloadJson(
          data,
          `carta-${filenamePart(letter.titulo)}-unidad-${unit.numero}.json`
        );
      });
      copyButton.addEventListener('click', () => copyJson(data, copyButton, copyLabel));
      heading.append(downloadButton, copyButton);
    });
  });

  const programData = {
    programa: programName,
    cartasDescriptivas: letters
  };
  const programFile = `programa-${filenamePart(programName)}.json`;
  const programDownloadLabel = 'Exportar el programa completo en JSON';
  const programCopyLabel = 'Copiar el programa completo en JSON al portapapeles';
  const programButton = makeDownloadIcon(
    programDownloadLabel,
    'btn btn-acc carta-export-programa'
  );
  programButton.style.cssText = 'position:fixed;right:1rem;bottom:1rem;z-index:1045;border-radius:50%;width:48px;height:48px;display:grid;place-items:center;box-shadow:0 6px 20px rgba(0,0,0,.25)';
  programButton.addEventListener('click', () => {
    downloadJson(programData, programFile);
  });

  const programCopyButton = makeCopyIcon(
    programCopyLabel,
    'btn btn-acc carta-copy-programa'
  );
  programCopyButton.style.cssText = 'position:fixed;right:4.5rem;bottom:1rem;z-index:1045;border-radius:50%;width:48px;height:48px;display:grid;place-items:center;box-shadow:0 6px 20px rgba(0,0,0,.25)';
  programCopyButton.addEventListener('click', () => {
    copyJson(programData, programCopyButton, programCopyLabel);
  });
  document.body.append(programButton, programCopyButton);
})();
