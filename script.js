            // Initialize CodeMirror instances for each editor
            var htmlEditor = CodeMirror.fromTextArea(document.getElementById('htmlCode'), {
                mode: 'htmlmixed',
                theme: 'darcula',
                lineWrapping: true,
                autoCloseBrackets: true,
                lineNumbers: true,
                autoCloseTags: true
            });
            
            var cssEditor = CodeMirror.fromTextArea(document.getElementById('cssCode'), {
                mode: 'css',
                theme: 'darcula',
                lineWrapping: true,
                autoCloseBrackets: true,
                lineNumbers: true
            });
            var jsEditor = CodeMirror.fromTextArea(document.getElementById('jsCode'), {
                mode: 'javascript',
                theme: 'darcula',
                lineWrapping: true,
                autoCloseBrackets: true,
                lineNumbers: true
            });

            htmlEditor.setSize(440, 300);
            cssEditor.setSize(440, 300);
            jsEditor.setSize(440, 300);

            htmlEditor.on("change", (editor, data) => {
             updateOutput();
            });
            cssEditor.on("change", (editor, data) => {
               updateOutput();
            });

            jsEditor.on("change", (editor, data) => {
               updateOutput();
            });

            function updateOutput() {
                let htmlCode = htmlEditor.getValue();
                let cssCode = "<style>" + cssEditor.getValue(); + "</style>";
                let jsCode = jsEditor.getValue();
                let outputFrame = document.getElementById('outputFrame');
            
                outputFrame.contentDocument.body.innerHTML = htmlCode + cssCode;
                outputFrame.contentWindow.eval(jsCode);
            }
            

            const codeSections = document.querySelectorAll('.code-section');
            const resizeHandle = document.getElementById('resize-handle');
            const outputWrapper = document.getElementById('output-wrapper');
            const outputFrame = document.getElementById('outputFrame');
            const scroll = document.querySelector('.CodeMirror-vscrollbar');

            let isResizing = false;

            resizeHandle.addEventListener('mousedown', handleMouseDown);
            resizeHandle.addEventListener('touchstart', handleTouchStart, { passive: true });

            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchend', handleTouchEnd);

            function handleMouseDown(event) {
                isResizing = true;
                document.addEventListener('mousemove', handleMouseMove);
            }

            function handleTouchStart(event) {
                isResizing = true;
                document.addEventListener('touchmove', handleTouchMove, { passive: false });
            }

            function handleMouseMove(event) {
                if (isResizing) {
                    const height = window.innerHeight - event.clientY;
                    adjustScrollBarVisibility(height);
                    outputWrapper.style.height = `${height}px`;
                    outputFrame.style.height = `${height}px`;
                }
            }

            function handleTouchMove(event) {
                event.preventDefault();
                if (isResizing && event.touches.length > 0) {
                    const touchY = event.touches[0].clientY;
                    const height = window.innerHeight - touchY;
                    adjustScrollBarVisibility(height);
                    outputWrapper.style.height = `${height}px`;
                    outputFrame.style.height = `${height}px`;

                }
            }

            function handleMouseUp() {

                    isResizing = false;
                    document.removeEventListener('mousemove', handleMouseMove);
                
            }

            function handleTouchEnd() {
             
                    isResizing = false;
                    document.removeEventListener('touchmove', handleTouchMove);
                
            }

            function adjustScrollBarVisibility(height) {
                // Loop through all CodeMirror instances and adjust scroll bar visibility
                codeSections.forEach(function (codeSection) {
                    const scroll = codeSection.querySelector('.CodeMirror-vscrollbar');
                    if (height > 395) {
                        scroll.style.display = 'none';
                    } else {
                        scroll.style.display = 'block';
                    }
                });
            }

            function toggleCodeSection(sectionId) {
                const sections = document.querySelectorAll('.code-section');
                const links = document.querySelectorAll('.nav-link');

                sections.forEach(section => {
                    if (section.id === sectionId) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });

                links.forEach(link => {
                    link.classList.remove('active');
                });

                event.currentTarget.classList.add('active');
            }

            $(function () {
                $("#output-section").draggable();
            });
            
        
        