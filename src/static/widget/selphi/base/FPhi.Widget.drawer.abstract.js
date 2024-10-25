if (!FPhi) {
    var FPhi = {};
}

/////////////////


if (FPhi.Drawer === undefined) {

    class Drawer {

        constructor(extractionMode, livenessMode, stabilizationStage, canvasSizeFactor, fontSizeFactor) {
            this.extractionMode = extractionMode;
            this.livenessMode = livenessMode;
            this.stabilizationStage = stabilizationStage;
            this.canvasSizeFactor = canvasSizeFactor;
            this.fontSizeFactor = fontSizeFactor;
            this.buttonHeight = 60 * this.canvasSizeFactor;
            this.faceCenterOffset = { x: 0, y: 0 };
            this.faceCenterOffsetTarget = { x: 0, y: 0 };
            this.processingMoveProgressStartTime = 0.5;
            
            this.moveFace = null;
            this.moveLeftEye = null;
            this.moveRightEye = null;
            this.lastMoveFace=null;
            this.lastMoveLeftEye=null;
            this.lastMoveRightEye=null;
        }

        cacheResources() {
            if (this.livenessMode == FPhi.Selphi.LivenessMode.Move) {
                console.log("caching animations...");
                this.cacheAnimation("LivenessMove", "liveness_move");
                this.cacheAnimation("LivenessMove", "liveness_move_left");
                this.cacheAnimation("LivenessMove", "liveness_move_right");
                this.cacheAnimation("LivenessMove", "liveness_move_top");
                this.cacheAnimation("LivenessMove", "liveness_move_bottom");
                this.cacheAnimation("LivenessInfo", "livenessMoveGlasses");
                this.cacheAnimation("LivenessInfo", "livenessMoveInfo");
            }
        }
        
        // setCanvasSize will be called every time drawing canvas resizes. Update internal vars according to the new size.
        setCanvasSize(width, height) {
            this.width = width;
            this.height = height;
            this.landscape = this.width>=this.height;
            this.circleX = this.width / 2.0;
            this.circleY = this.height * 0.380;
            //this.circleY = this.height * 0.420;
            this.circleRadius = this.height * 0.310;
            if (this.circleRadius > this.width/2.0 - 15)
                this.circleRadius = this.width/2.0 - 15;
            //this.circleRadius = this.width * (375.0/480.0)/2.0;
        }
        
        // get camera rect in canvas space.
        getCameraRect(context, cameraWidth, cameraHeight, viewId) {
            
            this.setCanvasSize(context.canvas.clientWidth,context.canvas.clientHeight);
            var toReturn = this.scaleRect({ width: cameraWidth, height: cameraHeight }, { x: 0, y: 0, width: this.width, height: this.height });
            toReturn.visible = true;
            
            // determine camera visibility
            /*if (viewId=="UCTutorial1" ||
                viewId=="UCTutorial2" ||
                viewId=="UCTutorial3" ||
                viewId=="UCPreview" ||
                viewId=="Error")
                toReturn.visible = false;*/
            
            return toReturn;
        }

        faceInsideCircle(faceRect) {
            
            var radius = this.circleRadius;
            var xCenter = this.circleX;
            var yCenter = this.circleY;
            
            var circleLeft = xCenter - radius;
            var circleRight = xCenter + radius;
            var circleTop = yCenter - radius;
            var circleBottom = yCenter + radius;
            
            //var tempFace = {x:faceRect.x, y:faceRect.y, width:faceRect.width, height:faceRect.height*0.75};
            var tempFace = {x:faceRect.x, y:faceRect.y, width:faceRect.width, height:faceRect.height};
            var intersection = Math.max(0, Math.min(tempFace.x+tempFace.width,circleRight) - Math.max(tempFace.x,circleLeft)) *
            Math.max(0, Math.min(tempFace.y + tempFace.height, circleBottom) - Math.max(tempFace.y, circleTop));
            
            var areaFace = tempFace.width * tempFace.height;
            var ratio = intersection / areaFace;
            
            if (ratio > 0.75)
                return true;
            else
                return false;
        }

        // Method called every time widget/tutorial change internal state.
        // Must be returned parent resource id in widget.xml that describes elements to be analyzed/drawed for actual state.
        getResourceIdForState(state) {

            if (state == "UCWaitingFaceStart") {
                return "StartExtractor";
            } else if (state == "UCExtracting" || state == "UCLivenessDetectionStep1" || state == "UCLivenessDetectionStep2" || state == "UCLivenessDetectionStep3" || state == "UCWaitingEyeDetection") {
                return "Extractor";
            } else if (state == "UCLivenessMoveStabilizing" || state == "UCLivenessMoveStabilized" || state == "UCLivenessMoveDetecting" || state == "UCLivenessMoveProcessing") {
                return "LivenessMove";
            } else if (state == "UCLivenessMoveInfo") {
                return "LivenessInfo";
            } else if (state == "UCTutorialRegister1") {
                return "RegistrationTips";
            } else if (state == "UCTutorialRegister2") {
                return "FaceMovementTips";
            } else if (state == "UCShowResults") {
                return "Results";
            } else if (state == "UCWizardCompleted") {
                return "Success";
            } else if (state == "UCTutorialBlink1") {
                return "Tutorial1";
            } else if (state == "UCTutorialBlink2") {
                return "Tutorial2";
            } else if (state == "UCTutorialBlink3") {
                return "Tutorial3";
            } else if (state == "UCTutorialMove1") {
                return "TutorialMove1";
            } else if (state == "UCTutorialMove2") {
                return "TutorialMove2";
            } else if (state == "UCTutorialMove3") {
                return "TutorialMove3";
            } else if (state == "UCErrors") {
                return "Error";
            } else {
                return null;
            }
        }

        onMouseMove(canvas, rect, viewId, elementId, elementType) {

            if (elementType == "button" || elementType == "buttonImage") {
                canvas.style.cursor = "pointer";
            } else {
                canvas.style.cursor = "default";
            }
        }

        // draw element.
        // return:
        //    true if element must be repositioned. Widget will call again getLayout.
        //    false for static elements.
        draw(canvas, rect, viewId, elementId, elementType, widgetTime, stateTime, mode, attributes) {

            canvas.imageSmoothingEnabled=true;

            if (elementType == "background") {

                this.drawBackground(canvas, rect, viewId, elementId, widgetTime, stateTime, mode, attributes);

            } else if (elementType == "button") {

                this.drawButton(canvas, rect, viewId, elementId);

            } else if (elementType == "buttonImage") {

                this.drawButtonImage(canvas, rect, viewId, elementId, widgetTime, stateTime, mode, attributes);

            } else if (elementType == "image") {
                
                this.drawImage(canvas, rect, viewId, elementId, widgetTime, stateTime, mode, attributes);
                
            } else if (elementType == "imageError") {

                this.drawImageError(canvas, rect, viewId, elementId, widgetTime, stateTime, mode, attributes);

            } else if (elementType == "text") {

                this.drawText(canvas, rect, viewId, elementId, widgetTime, stateTime, mode, attributes);

            } else if (elementType == "faceSearcher") {
                
                this.drawFaceSearcher(canvas, rect, viewId, elementId, widgetTime, stateTime, mode, attributes);
                
            } else if (elementType == "video") {

                if (viewId == "Extractor") {
                    if (this.extractionMode == FPhi.Selphi.Mode.Register)
                        this.drawImageWithClippingCircle(canvas, rect, attributes.player, rect.x + rect.width / 2.0, rect.y + rect.height / 2.0, rect.width / 2.0);
                } else {
                    this.drawImageWithClippingCircle(canvas, rect, attributes.player, rect.x + rect.width / 2.0, rect.y + rect.height / 2.0, rect.width / 2.0);
                }
                //this.drawImage(canvas,rect,attributes.player);

            } else if (elementType == "camera") {

                var progress = attributes.progress;
                var borderWidth = this.rm.getSetupFloat("facephi-widget-conf", "", this.landscape, "width_progress_bar");
                var colorProgress = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_progress_bar");
                var colorWarning = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_warning_message");
                var colorExcellent = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_excellent");
                var colorLow = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_low");

                /*
                canvas.save();
                canvas.translate(this.width, 0);
                canvas.scale(-1, 1);


                this.cameraWidth = attributes.width;
                this.cameraHeight = attributes.height;
                this.cameraRotation = attributes.cameraRotation;
                this.faceDataRect = attributes.faceDataRect;
                this.faceTracking = attributes.faceTracking;

                // draw camera image to visible canvas
                if ((this.faceDataRect != 'undefined') && (this.faceDataRect != null) && (this.faceTracking)) {
                    this.faceCenterOffsetTarget = { x: (this.faceDataRect.x + this.faceDataRect.width / 2.0) - this.circleX, y: (this.faceDataRect.y + this.faceDataRect.height / 2.0) - this.circleY }
                }
                this.faceCenterOffset.x += (this.faceCenterOffsetTarget.x - this.faceCenterOffset.x) * 0.1;
                this.faceCenterOffset.y += (this.faceCenterOffsetTarget.y - this.faceCenterOffset.y) * 0.1;
                var tRect = this.scaleRect({ width: this.cameraWidth, height: this.cameraHeight }, { x: 0, y: 0, width: this.width, height: this.height });

                // limit camera offset to circle bounds.
                var localCameraX = tRect.x + this.faceCenterOffset.x;
                if (localCameraX >= this.circleX - this.circleRadius) localCameraX = this.circleX - this.circleRadius;
                if (localCameraX + tRect.width <= this.circleX + this.circleRadius) localCameraX = this.circleX + this.circleRadius - tRect.width;
                var localCameraY = tRect.y - this.faceCenterOffset.y;
                if (localCameraY >= this.circleY - this.circleRadius) localCameraY = this.circleY - this.circleRadius;
                if (localCameraY + tRect.height <= this.circleY + this.circleRadius) localCameraY = this.circleY + this.circleRadius - tRect.height;

*/
                canvas.save();
                canvas.beginPath();
                canvas.arc(this.circleX, this.circleY, this.circleRadius, 0, 2 * Math.PI, false);
                canvas.clip();
                //canvas.drawImage(attributes.camera, localCameraX, localCameraY, tRect.width, tRect.height);
                
                if ((attributes.state == "UCLivenessMoveStabilizing") || (attributes.state=="UCLivenessMoveStabilized") || (attributes.state=="UCLivenessMoveDetecting") || (attributes.state=="UCLivenessMoveProcessing")) {
                    // Capa translucida negra para resaltar las letras
                    canvas.fillStyle = "#00000033";
                    canvas.fillRect(rect.x, rect.y, rect.width, rect.height);
                }

                //canvas.drawImage(attributes.camera, tRect.x, tRect.y, tRect.width, tRect.height);
                canvas.restore();

                //canvas.drawImage(attributes.camera, 0,0, tRect.width, tRect.height);

                var circleColor = colorProgress; // this.rm.getSetupColor("facephi-widget-conf", "", "color_progress_bar");
                if (mode == "Warning")
                    circleColor = colorWarning; // this.rm.getSetupColor("facephi-widget-conf", "", "color_warning_message");

                if (progress == 0.0 && mode == "Warning") {
                    // Arco completo
                    canvas.beginPath();
                    canvas.strokeStyle = colorLow; // this.rm.getSetupColor("facephi-widget-conf","","color_quality_low");
                    canvas.lineWidth = borderWidth; // this.rm.getSetupFloat("facephi-widget-conf", "", "width_progress_bar");
                    canvas.lineCap = "round";
                    canvas.arc(this.circleX, this.circleY, this.circleRadius - (canvas.lineWidth / 2) + 0.5, -Math.PI / 2, 2 * Math.PI - Math.PI / 2);
                    canvas.stroke();
                }

                if ((attributes.state == "UCLivenessMoveStabilizing") || (attributes.state=="UCLivenessMoveStabilized") || (attributes.state=="UCLivenessMoveDetecting") || (attributes.state=="UCLivenessMoveProcessing")) {
                    progress = 1.0;
                    if (attributes.liveness_move_last_result) circleColor = colorExcellent; // this.rm.getSetupColor("facephi-widget-conf","","color_quality_excellent");
                    else circleColor = colorLow; // this.rm.getSetupColor("facephi-widget-conf","","color_quality_low");
                    
                    if (attributes.state=="UCLivenessMoveDetecting" || attributes.state=="UCLivenessMoveProcessing") {
                        // Arco completo
                        canvas.beginPath();
                        canvas.strokeStyle = colorProgress; // this.rm.getSetupColor("facephi-widget-conf","","color_progress_bar");;
                        canvas.lineWidth = borderWidth; // this.rm.getSetupFloat("facephi-widget-conf", "", "width_progress_bar");
                        canvas.lineCap = "round";
                        canvas.arc(this.circleX, this.circleY, this.circleRadius - (canvas.lineWidth / 2) + 0.5, -Math.PI / 2, 2 * Math.PI - Math.PI / 2);
                        canvas.stroke();                            
                    }

                } else {
                
                    if (progress > 1.0) progress=1.0;
                    if (this.extractionMode == FPhi.Selphi.Mode.Authenticate)
                        progress = progress*progress*(3.0 - 2.0*progress); //smoothstep

                    canvas.beginPath();
                    canvas.strokeStyle = circleColor;
                    canvas.lineWidth = borderWidth; // this.rm.getSetupFloat("facephi-widget-conf", "", "width_progress_bar");
                    canvas.lineCap = "round";
                    canvas.arc(this.circleX, this.circleY, this.circleRadius - (canvas.lineWidth / 2) + 0.5, -Math.PI / 2, 2 * Math.PI * progress - Math.PI / 2);
                    canvas.stroke();

                    var colorShutter = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_shutter");
                    this.drawBlind(canvas, this.circleX, this.circleY, this.circleRadius, attributes.eyesYLevel, attributes.blind, colorShutter, attributes.blindText);                    
                }



            } else if (elementType == "results") {

                var totalTransitionTime = 1.000 + 1.500 * attributes.progress;
                var progressTime = stateTime / totalTransitionTime;
                if (progressTime > 1.0) {
                    progressTime = 1.0;
                }

                // Calculamos la interpolacion de la barra de progreso (OutQuad -> InOutQuad)
                progressTime = progressTime * (2.0 - progressTime);
                progressTime = progressTime < 0.5 ? 2 * progressTime * progressTime : -1 + (4 - 2 * progressTime) * progressTime;

                canvas.beginPath();
                canvas.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "background_color");
                canvas.arc(this.circleX, this.circleY, this.circleRadius, -Math.PI / 2, 2 * Math.PI - Math.PI / 2);
                canvas.fill();

                var scoreColor = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_excellent");
                if (attributes.progress <= 0.33)
                    scoreColor = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_low");
                else if (attributes.progress <= 0.66)
                    scoreColor = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_quality_good");

                canvas.beginPath();
                canvas.strokeStyle = scoreColor;
                canvas.lineWidth = this.rm.getSetupFloat("facephi-widget-conf", "", this.landscape, "width_progress_bar");
                canvas.lineCap = "round";
                canvas.arc(this.circleX, this.circleY, this.circleRadius - (canvas.lineWidth / 2) * 0.5, -Math.PI / 2, 2 * Math.PI * attributes.progress * progressTime - Math.PI / 2);
                canvas.stroke();

                // score text
                var message = "";
                var tipMessage = "";
                if (attributes.progress >= 1.0) {
                    message = this.rm.translate("results_quality_excellent");
                    tipMessage = this.rm.translate("results_quality_message");
                } else if (attributes.progress >= 0.333) {
                    message = this.rm.translate("results_quality_good");
                    tipMessage = this.rm.translate("results_quality_message");
                } else {
                    message = this.rm.translate("results_quality_low");
                    tipMessage = this.rm.translate("results_quality_message");
                }

                var textSize = this.rm.getSetupFloat(viewId, elementId, this.landscape, "fontResult_size");
                var lineHeight = textSize+1;
                var textFont = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "fontResult");
                var align = "CENTER";
                var valign = "TOP";
                this.drawStringMultiline(canvas, message, { x: 0, y: this.circleY - 5, width: this.width, height: this.height }, scoreColor, textFont, textSize,lineHeight,align,valign);

                textSize = this.rm.getSetupFloat(viewId, elementId, this.landscape, "fontQuality_size");
                var lineHeight = textSize+1;
                textFont = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "fontQuality");
                var align = "CENTER";
                var valign = "TOP";
                this.drawStringMultiline(canvas, tipMessage, { x: 0, y: this.circleY + 5 + textSize, width: this.width, height: this.height }, scoreColor, textFont, textSize,lineHeight,align,valign);

            } else if (elementType == "animation") {
                var direction=0;
                //if (attributes.state == "UCLivenessMoveDetecting") {
                    if ("livenessMoveDirection" in attributes)
                        direction = attributes.livenessMoveDirection;
                    if (elementId!="liveness_move") direction=0;
                //}
                this.drawAnimation(canvas, rect, viewId, elementId, widgetTime, stateTime, mode, attributes,direction);
            } else if (elementId == "progress") {
                canvas.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "background_color");
                canvas.fillRect(rect.x, rect.y, rect.width, rect.height);

                canvas.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "progress_color");
                canvas.fillRect(rect.x, rect.y, rect.width*attributes.progress, rect.height);
            }
        }

        // returns rectangle area where element must be located and drawed.
        // return null if elementId must be hide/disabled
        getLayout(viewId, elementId, elementType, widgetTime, stateTime, mode, attributes) {

            if ((viewId == "Tutorial1") || (viewId == "Tutorial2") || (viewId == "Tutorial3") ||
                (viewId == "TutorialMove1") || (viewId == "TutorialMove2") || (viewId=="TutorialMove3")) {

                if (elementId == "background") return { x: 0, y: 0, width: this.width, height: this.height };
                else if (elementType == "video") return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                else if (elementId == "tip") return { x: 0, y: this.height * 0.75, width: this.width, height: this.height * 0.10 };
                else if (elementId == "tip_detail") return { x: 0, y: this.height * 0.82, width: this.width, height: this.height * 0.10 };
                else if (elementId == "button_skip") return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_back") return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_next") return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_done") return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_exit") {
                    var content = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "value");
                    var img = this.rm.getImage(content);
                    var imgScaleFactor = (this.canvasSizeFactor) * this.rm.getImageScale();
                    var imgWidth = img.width * imgScaleFactor;
                    var imgHeight = img.height * imgScaleFactor;
                    return { x: this.width - imgWidth - 30, y: 0, width: imgWidth + 30, height: imgHeight + 30 };
                }
                else if (elementId=="liveness_move") {
                    return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                }

            } else {
                if (elementId == "background") return { x: 0, y: 0, width: this.width, height: this.height };
                else if (elementId == "tip_video") return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                else if (elementId == "imageError") return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                else if (elementId == "video_success") return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                else if (elementId == "extraction_video") return { x: this.width / 2 - this.width * 0.1, y: this.height * 0.73, width: this.width * 0.2, height: this.width * 0.2 };
                else if (elementId == "tip") return { x: 0, y: this.height * 0.75, width: this.width, height: this.height * 0.10 };
                else if (elementId == "text_error") return { x: 0, y: this.height * 0.75, width: this.width, height: this.height * 0.10 };
                else if (elementId == "text") {
                    return { x: 0, y: this.circleY+this.circleRadius, width: this.width, height: (this.height-this.buttonHeight-10) -  (this.circleY+this.circleRadius)};
                    //return { x: 0, y: this.height * 0.80, width: this.width, height: this.height * 0.10 };
                }
                else if (elementId == "tip_detail") return { x: 0, y: this.height * 0.82, width: this.width, height: this.height * 0.10 };
                else if (elementId == "button_skip") return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_next") return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_done") return { x: this.width / 2, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_start") {
                    let w = 209.0*this.canvasSizeFactor;
                    return { x: this.width/2 - w/2.0, y: this.height - this.buttonHeight+10, width: w, height: this.buttonHeight-10 };
                }
                else if (elementId == "button_error") return { x: this.width / 4, y: this.height - this.buttonHeight+10, width: this.width / 2, height: this.buttonHeight-10 };
                else if (elementId == "button_back") return { x: 0, y: this.height - this.buttonHeight, width: this.width / 2, height: this.buttonHeight };
                else if (elementId == "button_repeat") return { x: this.width * 0.05, y: this.height - this.buttonHeight, width: this.width * 0.4, height: this.buttonHeight };
                else if (elementId == "button_finish") return { x: this.width * 0.55, y: this.height - this.buttonHeight, width: this.width * 0.4, height: this.buttonHeight };
                else if (elementId == "button_exit") {

                    var content = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "value");
                    var img = this.rm.getImage(content);
                    var imgScaleFactor = (this.canvasSizeFactor) * this.rm.getImageScale();
                    var imgWidth = img.width * imgScaleFactor;
                    var imgHeight = img.height * imgScaleFactor;
                    return { x: this.width - imgWidth - 30, y: 0, width: imgWidth + 30, height: imgHeight + 30 };
                }
                else if (elementId == "button_info") {

                    if ((this.extractionMode == FPhi.Selphi.Mode.Register) ||
                        (this.livenessMode != FPhi.Selphi.LivenessMode.None)) {
                        var content = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "value");
                        var img = this.rm.getImage(content);
                        var imgScaleFactor = (this.canvasSizeFactor) * this.rm.getImageScale();
                        var imgWidth = img.width * imgScaleFactor;
                        var imgHeight = img.height * imgScaleFactor;
                        return { x: 0, y: 0, width: imgWidth + 30, height: imgHeight + 30 };
                    }
                }
                else if (elementId == "warning") return { x: 0, y: this.height * 0.89, width: this.width, height: this.height * 0.10 };
                else if (elementId == "warningTooFar") return { x: 0, y: this.height * 0.89, width: this.width, height: this.height * 0.10 };
                else if (elementType == "camera") return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                else if (elementType == "results") return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                else if (elementId == "liveness_move_text") {
                    //if ((attributes.state == "UCLivenessMoveStabilizing") || (attributes.state == "UCLivenessMoveStabilized") || (attributes.state == "UCLivenessMoveDetecting"))
                        if (attributes.state=="UCLivenessMoveProcessing" && (stateTime<0.5)) return null;
                        return { x: 0, y: this.height * 0.89, width: this.width, height: this.height * 0.10 };
                    //else
                    //    return null;
                }
                else if (elementId == "liveness_move_tip_text") {
                    return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius*0.39, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                }
                else if (elementId == "livenessInfo_text") {
                    return { x: 0, y: this.height * 0.89, width: this.width, height: this.height * 0.10 };
                }
                else if (elementId == "liveness_move") {
                    if ((attributes.state == "UCLivenessMoveDetecting") && (stateTime >= 0.25) && (stateTime < 1.75)) {
                        var fullscreen = false;
                        if (this.rm.isAttributeAvailable(viewId,elementId,this.landscape,"fullscreen")) {
                            if (this.rm.getSetupResourceId(viewId,elementId,this.landscape,"fullscreen") == "true")
                                fullscreen=true;
                        }
                        if (fullscreen)
                            return { x: 0, y: 0, width: this.width, height:this.height };
                        else
                            return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                    }
                    //console.log(viewId);
                    return null;
                }
                else if ((elementId == "liveness_move_left") || (elementId=="liveness_move_right") ||
                         (elementId == "liveness_move_top") || (elementId=="liveness_move_bottom")) {
                    
                    if ((attributes.state == "UCLivenessMoveDetecting") && (stateTime >= 0.25) && (stateTime < 1.75)) {
                        if ((attributes.livenessMoveDirection==0) && (elementId!="liveness_move_top"))
                            return null;
                        if ((attributes.livenessMoveDirection==2) && (elementId!="liveness_move_bottom"))
                            return null;
                        if ((attributes.livenessMoveDirection==1) && (elementId!="liveness_move_right"))
                            return null;
                        if ((attributes.livenessMoveDirection==3) && (elementId!="liveness_move_left"))
                            return null;

                        var fullscreen = false;
                        if (this.rm.isAttributeAvailable(viewId,elementId,this.landscape,"fullscreen")) {
                            if (this.rm.getSetupResourceId(viewId,elementId,this.landscape,"fullscreen") == "true")
                                fullscreen=true;
                        }
                        if (fullscreen)
                            return { x: 0, y: 0, width: this.width, height:this.height };
                        else
                            return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                    }
                    else
                        return null;
                }
                else if (elementId == "face_searcher") {
                    return { x: 0, y: 0, width: this.width, height:this.height };
                }
                else if (elementId == "livenessMoveGlasses") {
                    if (attributes.livenessMoveFailReason==0)
                        return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                }
                else if (elementId == "livenessMoveInfo") {
                    if (attributes.livenessMoveFailReason==1)
                        return { x: this.circleX - this.circleRadius, y: this.circleY - this.circleRadius, width: this.circleRadius * 2, height: this.circleRadius * 2 };
                }
                else if (elementId=="progress") {
                    if (attributes.state=="UCLivenessMoveProcessing" && (stateTime>this.processingMoveProgressStartTime))
                        return {x:this.circleX-this.circleRadius,y:this.height * 0.80,width:this.circleRadius*2.0,height:19};
                }
            }
            //console.log("viewId: "+viewId+" elementId: "+elementId);
            return null;
        }

        drawBackground(canvasContext, rect, viewId, elementId, widgetTime, stateTime, mode, attributes) {

            canvasContext.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "top");
            //canvasContext.fillStyle = "#FF0000";
            canvasContext.fillRect(rect.x, rect.y, rect.width, (this.circleY - this.circleRadius) +1);

            if (this.rm.getSetupResourceId(viewId,elementId,this.landscape,"clipped").toLowerCase()=="true") {
                canvasContext.save();
                canvasContext.beginPath();
                canvasContext.arc(this.circleX, this.circleY, this.circleRadius, 0, 2.0 * Math.PI, false);
                canvasContext.rect(0,0,this.width,this.height);
                canvasContext.clip("evenodd");
            }

            canvasContext.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "middle_top");
            canvasContext.fillRect(rect.x, this.circleY - this.circleRadius, rect.width, this.circleRadius*2.0 + 1);

            if (this.rm.getSetupResourceId(viewId,elementId,this.landscape,"clipped").toLowerCase()=="true")
                canvasContext.restore();

            canvasContext.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "middle_bottom");
            canvasContext.fillRect(rect.x, this.circleY + this.circleRadius, rect.width, (this.height - this.buttonHeight) - (this.circleY + this.circleRadius) + 1);

            canvasContext.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "bottom");
            canvasContext.fillRect(rect.x, this.height - this.buttonHeight, rect.width, this.buttonHeight);

            var color = this.rm.getSetupColor(viewId, elementId, this.landscape, "pagination_separator");
            if (color != null) {
                canvasContext.fillStyle = color;
                canvasContext.fillRect(0, this.height - this.buttonHeight - 1, rect.width, 1);
            }

        }

        drawPoint(canvasContext, x, y, radius, color) {
            canvasContext.fillStyle = color;
            canvasContext.beginPath();
            canvasContext.arc(x,y,radius,0,Math.PI*2.0);
            canvasContext.fill();
        }
        
        drawLine(canvasContext,x1,y1,x2,y2,color) {
            canvasContext.lineWidth=1.0;
            canvasContext.strokeStyle = color;
            canvasContext.beginPath();
            canvasContext.moveTo(x1,y1);
            canvasContext.lineTo(x2,y2);
            canvasContext.stroke();
        }
        
        drawFaceSearcher(canvasContext, rectButton, viewId, elementId, widgetTime, stateTime, mode, attributes) {
            
            var progress = attributes.progress;
            var leftEye = attributes.leftEyeData;
            var rightEye = attributes.rightEyeData;
            var face = attributes.faceDataRect;
            
            if (face) {
                this.lastMoveFace = face;
                if (this.moveFace == null)
                    this.moveFace = this.lastMoveFace;
            }
            
            if (leftEye) {
                this.lastMoveLeftEye = leftEye;
                if (this.moveLeftEye == null)
                    this.moveLeftEye = this.lastMoveLeftEye;
            }
            
            if (rightEye) {
                this.lastMoveRightEye = rightEye;
                if (this.moveRightEye == null)
                    this.moveRightEye = this.lastMoveRightEye;
            }
            
            if (this.moveFace) {
                this.moveFace.x += (this.lastMoveFace.x - this.moveFace.x)*0.1;
                this.moveFace.y += (this.lastMoveFace.y - this.moveFace.y)*0.1;
                this.moveFace.width += (this.lastMoveFace.width - this.moveFace.width)*0.1;
                this.moveFace.height += (this.lastMoveFace.height - this.moveFace.height)*0.1;
            }
            
            if (this.moveLeftEye) {
                this.moveLeftEye.x += (this.lastMoveLeftEye.x - this.moveLeftEye.x)*0.15;
                this.moveLeftEye.y += (this.lastMoveLeftEye.y - this.moveLeftEye.y)*0.15;

                this.drawPoint(canvasContext,this.moveLeftEye.x - this.width*0.05,this.moveLeftEye.y,2,"#ffffff");
                this.drawPoint(canvasContext,this.moveLeftEye.x + this.width*0.04,this.moveLeftEye.y,2,"#ffffff");
                this.drawPoint(canvasContext,this.moveLeftEye.x - this.width*0.02,this.moveLeftEye.y - this.height*0.05,2,"#ffffff");
                this.drawLine(canvasContext,this.moveLeftEye.x - this.width*0.05,this.moveLeftEye.y,this.moveLeftEye.x + this.width*0.04,this.moveLeftEye.y,"#ffffff");
                this.drawLine(canvasContext,this.moveLeftEye.x - this.width*0.05,this.moveLeftEye.y,this.moveLeftEye.x - this.width*0.02,this.moveLeftEye.y - this.height*0.05,"#ffffff");
                this.drawLine(canvasContext,this.moveLeftEye.x + this.width*0.04,this.moveLeftEye.y,this.moveLeftEye.x - this.width*0.02,this.moveLeftEye.y - this.height*0.05,"#ffffff");
                
                if (this.moveFace) {
                    this.drawLine(canvasContext,this.moveLeftEye.x + this.width*0.04,this.moveLeftEye.y,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,"#ffffff");
                    this.drawLine(canvasContext,this.moveLeftEye.x - this.width*0.05,this.moveLeftEye.y,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,this.moveFace.x+this.moveFace.width/2.0 - this.moveFace.width*0.15,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.02,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0 - this.moveFace.width*0.15,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.02,this.moveFace.x + this.moveFace.width/2.0 - this.moveFace.width*0.35,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.30,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,this.moveFace.x+this.moveFace.width/2.0 - this.moveFace.width*0.20,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.25,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0 - this.moveFace.width*0.20,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.25,this.moveFace.x + this.moveFace.width/2.0,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.50,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0 - this.moveFace.width*0.20,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.25,this.moveFace.x + this.moveFace.width/2.0 - this.moveFace.width*0.35,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.30,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x + this.moveFace.width/2.0 - this.moveFace.width*0.35,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.30,this.moveFace.x + this.moveFace.width/2.0,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.50,"#ffffff");

                }
            }
            if (this.moveRightEye) {
                this.moveRightEye.x += (this.lastMoveRightEye.x - this.moveRightEye.x)*0.15;
                this.moveRightEye.y += (this.lastMoveRightEye.y - this.moveRightEye.y)*0.15;

                this.drawPoint(canvasContext,this.moveRightEye.x + this.width*0.05,this.moveRightEye.y,2,"#ffffff");
                this.drawPoint(canvasContext,this.moveRightEye.x - this.width*0.04,this.moveRightEye.y,2,"#ffffff");
                this.drawPoint(canvasContext,this.moveRightEye.x + this.width*0.02,this.moveRightEye.y - this.height*0.05,2,"#ffffff");
                this.drawLine(canvasContext,this.moveRightEye.x + this.width*0.05,this.moveRightEye.y,this.moveRightEye.x - this.width*0.04,this.moveRightEye.y,"#ffffff");
                this.drawLine(canvasContext,this.moveRightEye.x + this.width*0.05,this.moveRightEye.y,this.moveRightEye.x + this.width*0.02,this.moveRightEye.y - this.height*0.05,"#ffffff");
                this.drawLine(canvasContext,this.moveRightEye.x - this.width*0.04,this.moveRightEye.y,this.moveRightEye.x + this.width*0.02,this.moveRightEye.y - this.height*0.05,"#ffffff");
                
                if (this.moveFace) {
                    this.drawLine(canvasContext,this.moveRightEye.x - this.width*0.04,this.moveRightEye.y,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,"#ffffff");
                    this.drawLine(canvasContext,this.moveRightEye.x + this.width*0.05,this.moveRightEye.y,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,this.moveFace.x+this.moveFace.width/2.0 + this.moveFace.width*0.15,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.02,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0 + this.moveFace.width*0.15,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.02,this.moveFace.x + this.moveFace.width/2.0 + this.moveFace.width*0.35,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.30,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.05,this.moveFace.x+this.moveFace.width/2.0 + this.moveFace.width*0.20,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.25,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0 + this.moveFace.width*0.20,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.25,this.moveFace.x + this.moveFace.width/2.0,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.50,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x+this.moveFace.width/2.0 + this.moveFace.width*0.20,this.moveFace.y+this.moveFace.height/2.0 + this.moveFace.height*0.25,this.moveFace.x + this.moveFace.width/2.0 + this.moveFace.width*0.35,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.30,"#ffffff");
                    this.drawLine(canvasContext,this.moveFace.x + this.moveFace.width/2.0 + this.moveFace.width*0.35,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.30,this.moveFace.x + this.moveFace.width/2.0,this.moveFace.y+ this.moveFace.height/2.0 + this.moveFace.height*0.50,"#ffffff");
                    
                }

            }
        }
        
        drawButtonImage(canvasContext, rectButton, viewId, elementId, widgetTime, stateTime, mode, attributes) {

            var content = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "value");
            var img = this.rm.getImage(content);
            var imgScaleFactor = (this.canvasSizeFactor) * this.rm.getImageScale();
            var imgWidth = img.width * imgScaleFactor;
            var imgHeight = img.height * imgScaleFactor;
            canvasContext.drawImage(img,
                                    rectButton.x + rectButton.width / 2.0 - imgWidth / 2.0,
                                    rectButton.y + rectButton.height / 2.0 - imgHeight / 2.0,
                                    imgWidth,
                                    imgHeight);
        }

        drawButton(canvasContext, rectButton, viewId, elementId) {

            canvasContext.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "decorator");
            canvasContext.fillRect(rectButton.x, rectButton.y + 4, rectButton.width, rectButton.height - 4);
            canvasContext.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "background");
            canvasContext.fillRect(rectButton.x, rectButton.y, rectButton.width, rectButton.height - 4);

            var align = this.rm.getSetupAlign(viewId, elementId, this.landscape, "align");
            var type = this.rm.getSetupNodeType(viewId, elementId);
            var buttonPadding = 10 * this.canvasSizeFactor;
            if (type == "TEXT_ID") {
                var content = this.rm.getSetupTextId(viewId, elementId, this.landscape, "content");
                var text = this.rm.translate(content);
                var fontSize = this.rm.getSetupFloat(viewId, elementId, this.landscape, "font_size");
                fontSize = Math.round(fontSize * this.fontSizeFactor);
                var fontName = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "font");
                canvasContext.font = fontSize + "px '" + fontName + "'";
                canvasContext.fillStyle = this.rm.getSetupColor(viewId, elementId, this.landscape, "foreground");
                var dim = canvasContext.measureText(text);

                if (align == "LEFT") {
                    canvasContext.fillText(text, rectButton.x + buttonPadding, rectButton.y + rectButton.height / 2);
                } else if (align == "RIGHT") {
                    canvasContext.fillText(text, rectButton.x + rectButton.width - dim.width - buttonPadding, rectButton.y + rectButton.height / 2);
                } else {
                    canvasContext.fillText(text, rectButton.x + rectButton.width / 2 - dim.width / 2, rectButton.y + rectButton.height / 2);
                }
            } else { // RESOURCE_ID
                var content = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "content");
                var img = this.rm.getImage(content);
                var imgScaleFactor = (this.canvasSizeFactor) * this.rm.getImageScale();

                if (align == "LEFT") {
                    canvasContext.drawImage(img,
                                            rectButton.x + buttonPadding,
                                            rectButton.y + rectButton.height / 2.0 - (img.height * imgScaleFactor) / 2.0,
                                            img.width * imgScaleFactor,
                                            img.height * imgScaleFactor);
                } else if (align == "RIGHT") {
                    canvasContext.drawImage(img,
                                            rectButton.x + rectButton.width - (img.width * imgScaleFactor) - buttonPadding,
                                            rectButton.y + rectButton.height / 2.0 - (img.height * imgScaleFactor) / 2.0,
                                            img.width * imgScaleFactor,
                                            img.height * imgScaleFactor);
                } else {
                    canvasContext.drawImage(img,
                                            rectButton.x + rectButton.width / 2.0 - (img.width * imgScaleFactor) / 2.0,
                                            rectButton.y + rectButton.height / 2.0 - (img.height * imgScaleFactor) / 2.0,
                                            img.width * imgScaleFactor,
                                            img.height * imgScaleFactor);
                }
            }

        }

        drawImage(canvasContext, rectButton, viewId, elementId, widgetTime, stateTime, mode, attributes) {

            var content = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "value");
            var img = this.rm.getImage(content);
            var imgScaleFactor = (this.canvasSizeFactor) * this.rm.getImageScale();
            var imgWidth = img.width * imgScaleFactor;
            var imgHeight = img.height * imgScaleFactor;
            canvasContext.drawImage(img,
                                    rectButton.x + rectButton.width / 2.0 - imgWidth / 2.0,
                                    rectButton.y + rectButton.height / 2.0 - imgHeight / 2.0,
                                    imgWidth,
                                    imgHeight);
        }

        drawImageError(canvasContext, rectButton, viewId, elementId, widgetTime, stateTime, mode, attributes) {
            
            var img = this.rm.getImage("livenessError.png");
            switch (attributes.livenessDiagnostic) {
                case -1:
                    img = this.rm.getImage("timeout.png");
                    break;
                case FPhi.Selphi.LivenessDiagnostic.UnsuccessLowPerformance:
                    img = this.rm.getImage("livenessPerformance.png");
                    break;
                case FPhi.Selphi.LivenessDiagnostic.UnsuccessGlasses:
                    img = this.rm.getImage("livenessGlasses.png");
                    break;
                case FPhi.Selphi.LivenessDiagnostic.UnsuccessLight:
                    img = this.rm.getImage("livenessLights.png");
                    break;
            }
            var imgScaleFactor = (this.canvasSizeFactor) * this.rm.getImageScale();
            var imgWidth = img.width;// * imgScaleFactor;
            var imgHeight = img.height;// * imgScaleFactor;
                                                                            
            var toReturn = this.scaleRect({ width: img.width, height: img.height }, rectButton);

            canvasContext.drawImage(img,
                                    toReturn.x,
                                    toReturn.y,
                                    toReturn.width,
                                    toReturn.height);
        }

        drawImageWithClippingCircle(canvasContext, rect, img, centerX, centerY, radius) {

            canvasContext.save();
            canvasContext.beginPath();
            canvasContext.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
            canvasContext.clip();
            canvasContext.drawImage(img, rect.x, rect.y, rect.width, rect.height);
            canvasContext.restore();

        }

        cacheAnimation(viewId, elementId) {
            if (!this.rm.isAttributeAvailable(viewId,elementId,this.landscape,"id")) return;
            
            var name = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "name");
            var ext = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "ext");
            var anim_start = parseInt(this.rm.getSetupResourceId(viewId, elementId, this.landscape, "start"));
            var anim_end = parseInt(this.rm.getSetupResourceId(viewId, elementId, this.landscape, "end"));
            for (var a = anim_start; a <= anim_end; a++) {
                var frame_index_string = ("0" + a).slice(-2);
                var filename = name + frame_index_string + "." + ext;
                var img = this.rm.getImage(filename);
            }
        }

        drawAnimation(canvasContext, rect, viewId, elementId, widgetTime, stateTime, mode, attributes, direction) {

            var t = stateTime;// - 0.25;
            //t = t / 1.5;
            t = t / 2.0;
            if (t > 1.0) t = 1.0;

            if ("videoProgress" in attributes)
                t = attributes.videoProgress;
            
            canvasContext.save();
            canvasContext.translate(rect.x+rect.width/2.0,rect.y+rect.height/2.0);
            switch (direction) {
                case 1:
                    canvasContext.rotate(-Math.PI*3.0/2.0);
                    break;
                case 2:
                    canvasContext.rotate(Math.PI);
                    break;
                case 3:
                    canvasContext.rotate(-Math.PI*1.0/2.0);
                    break;
            }
            canvasContext.translate(-(rect.x+rect.width/2.0),-(rect.y+rect.height/2.0));

            var name = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "name");
            var ext = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "ext");
            var anim_start = parseInt(this.rm.getSetupResourceId(viewId, elementId, this.landscape, "start"));
            var anim_end = parseInt(this.rm.getSetupResourceId(viewId, elementId, this.landscape, "end"));
            var frame_index = Math.floor((anim_end - anim_start) * t + anim_start);
            var frame_index_string = ("0" + frame_index).slice(-2);
            var filename = name + frame_index_string + "." + ext;
            //console.log("start: " + anim_start + " end: " + anim_end + " t: " + t + " frame_index" + frame_index);
            var img = this.rm.getImage(filename);
            canvasContext.drawImage(img, rect.x, rect.y, rect.width, rect.height);

            canvasContext.restore();
        }

        drawText(canvasContext, rect, viewId, elementId, widgetTime, stateTime, mode, attributes) {

            var textSize = this.rm.getSetupFloat(viewId, elementId, this.landscape, "font_size");
            var lineHeight = textSize+1;
            if (this.rm.isAttributeAvailable(viewId, elementId, this.landscape, "line_height"))
                lineHeight = this.rm.getSetupFloat(viewId, elementId, this.landscape, "line_height");
            var textColor = this.rm.getSetupColor(viewId, elementId, this.landscape, "color");
            var textFont = this.rm.getSetupResourceId(viewId, elementId, this.landscape, "font");
            var align = "CENTER";
            if (this.rm.isAttributeAvailable(viewId, elementId, this.landscape, "align"))
                align = this.rm.getSetupAlign(viewId, elementId, this.landscape, "align");
            var valign = "TOP";
            if (this.rm.isAttributeAvailable(viewId, elementId, this.landscape, "valign"))
                valign = this.rm.getSetupAlign(viewId, elementId, this.landscape, "valign");

            var text = "";
            if (viewId == "Tutorial1") {
                if (elementId == "tip") text = this.rm.translate("tutorial1_tip");
                else text = this.rm.translate("tutorial1_tip_detail");
            } else if (viewId == "Tutorial2") {
                if (elementId == "tip") text = this.rm.translate("tutorial2_tip");
                else text = this.rm.translate("tutorial2_tip_detail");
            } else if (viewId == "Tutorial3") {
                if (elementId == "tip") text = this.rm.translate("tutorial3_tip");
                else text = this.rm.translate("tutorial3_tip_detail");
            } else if (viewId == "TutorialMove1") {
                if (elementId == "tip") text = this.rm.translate("tutorialMove1_tip");
                else text = this.rm.translate("tutorialMove1_tip_detail");
            } else if (viewId == "TutorialMove2") {
                if (elementId == "tip") text = this.rm.translate("tutorialMove2_tip");
                else text = this.rm.translate("tutorialMove2_tip_detail");
            } else if (viewId == "TutorialMove3") {
                if (elementId == "tip") text = this.rm.translate("tutorialMove3_tip");
                else text = this.rm.translate("tutorialMove3_tip_detail");
            } else if (viewId == "RegistrationTips") {
                if (elementId == "tip") text = this.rm.translate("registration_tips_title");
                else text = this.rm.translate("registration_tips_detail");
            } else if (viewId == "FaceMovementTips") {
                if (elementId == "tip") text = this.rm.translate("face_movement_tips_title");
                else text = this.rm.translate("face_movement_tips_detail");
            } else if (viewId == "StartExtractor") {
                if (elementId == "text") text = this.rm.translate("start_extractor_title");
            } else if (viewId == "Extractor") {
                if (elementId == "warning") text = this.rm.translate("error_message_face");
                if (this.extractionMode != FPhi.Selphi.Mode.Register)
                    if (elementId == "text") text = this.rm.translate("start_extractor_title");
            } else if (viewId == "LivenessMove") {
                                         
                if (elementId == "liveness_move_text") {
                     if (attributes.state=="UCLivenessMoveStabilizing" || attributes.state=="UCLivenessMoveStabilized") {
                        text = this.rm.translate("extracting_title");
                     } else if (attributes.state=="UCLivenessMoveDetecting") {
                         var direction = attributes.livenessMoveDirection;
                         switch (direction) {
                             case 0:
                                 text = this.rm.translate("liveness_move_tip_up");
                                 break;
                             case 1:
                                 text = this.rm.translate("liveness_move_tip_right");
                                 break;
                             case 2:
                                 text = this.rm.translate("liveness_move_tip_down");
                                 break;
                             case 3:
                                 text = this.rm.translate("liveness_move_tip_left");
                                 break;
                         }
                     } else if (attributes.state=="UCLivenessMoveProcessing") {
                        text = this.rm.translate("liveness_move_processing");
                     }
                 } else if (elementId == "warning") {
                    if (attributes.state=="UCLivenessMoveStabilizing" || attributes.state=="UCLivenessMoveStabilized") {
                         switch (attributes.livenessMoveLastStabilizedStatus) {
                            case 1:
                                text = this.rm.translate("liveness_move_stabilizing_ok");
                                break;
                            case 2:
                                text = this.rm.translate("liveness_move_stabilizing_not_stabilized");
                                break;
                            case 3: // toofar
                                text = this.rm.translate("liveness_move_stabilizing_not_stabilized_too_far");
                                break;
                            case 4:
                                text = this.rm.translate("liveness_move_stabilizing_not_stabilized_sun_glasses");
                                break;
                            case 5: // tooclose
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_too_close");
                                 break;
                             case 6:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_too_movement");
                                 break;
                             case 7:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_performance");
                                 break;
                             case 8:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal");
                                 break;
                             case 9:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_left");
                                 break;
                             case 10:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_right");
                                 break;
                             case 11:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_down");
                                 break;
                             case 12:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_frontal_too_up");
                                 break;
                             case 13:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_no_color");
                                 break;
                             case 14:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_quality");
                                 break;
                             case 15:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_face_quality");
                                 break;
                             case 16:
                                 text = this.rm.translate("liveness_move_stabilizing_not_stabilized_low_pattern_quality");
                                 break;
                             case 17:
                                 text = this.rm.translate("liveness_move_stabilizing_ok_glasses");
                                 break;
                             default:
                                 text = this.rm.translate("extracting_title");
                                 break;
                         }
                    }
                    
                 }
            } else if (viewId == "LivenessInfo") {
                if (elementId == "livenessInfo_text") {
                    if (attributes.livenessMoveFailReason==0) // glasses
                        text = this.rm.translate("liveness_move_info_sunglasses");
                    else
                        text = this.rm.translate("liveness_move_info_unsuccess");
                }
            } else if (viewId == "Results") {
                if (elementId == "tip") {

                    if (stateTime < 1.0)
                        textColor = "#00000000";
                    else if (stateTime >= 1.0) {
                        var alfa = (stateTime - 1.0) * 2.0;
                        if (alfa > 1.0) alfa = 1.0;
                        textColor = this.rm.getSetupColorWithAlpha(viewId, elementId, this.landscape, "color", alfa);

                    }

                    if (attributes.progress >= 1.0) {
                        text = this.rm.translate("results_message_excellent");
                    } else if (attributes.progress >= 0.333) {
                        text = this.rm.translate("results_message_good");
                    } else {
                        text = this.rm.translate("results_message_low");
                    }
                }
            } else if (viewId == "Error") {
                if (elementId == "text_error") {
                    switch (attributes.livenessDiagnostic) {
                        case -1:
                            text = this.rm.translate("timeout");
                            break;
                        case FPhi.Selphi.LivenessDiagnostic.UnsuccessLowPerformance:
                            text = this.rm.translate("livenessErrorPerformance");
                            break;
                        case FPhi.Selphi.LivenessDiagnostic.UnsuccessGlasses:
                            text = this.rm.translate("livenessErrorGlasses");
                            break;
                        case FPhi.Selphi.LivenessDiagnostic.UnsuccessLight:
                            text = this.rm.translate("livenessErrorDark");
                            break;
                        case FPhi.Selphi.LivenessDiagnostic.UnsuccessNoMovement:
                            text = this.rm.translate("livenessErrorNoMovement");
                            break;
                        case FPhi.Selphi.LivenessDiagnostic.UnsuccessWrongDirection:
                            text = this.rm.translate("livenessErrorWrongDirection");
                            break;
                        case FPhi.Selphi.LivenessDiagnostic.UnsuccessTooFar:
                            text = this.rm.translate("livenessErrorTooFar");
                            break;
                        default:
                            text = this.rm.translate("livenessMoveError");
                    }
                }
            }

            this.drawStringMultiline(canvasContext, text, rect, textColor, textFont, textSize,lineHeight, align, valign);
        }

        /*drawStringMultiline(canvasContext, text, rect, textColor, font, fontSize) {

            var lines = text.split("\n");
            canvasContext.imageSmoothingEnabled = false;
            fontSize = Math.round(fontSize * this.fontSizeFactor);
            canvasContext.font = fontSize + "px '" + font + "'";
            canvasContext.fillStyle = textColor;
            for (var a = 0; a < lines.length; a++) {
                var dim = canvasContext.measureText(lines[a]);
                canvasContext.fillText(lines[a], rect.x + rect.width / 2 - dim.width / 2, rect.y + a * (fontSize + 1));
            }
        }*/
                                         
        drawStringMultiline(canvasContext, text, rect, textColor, font, fontSize, lineHeight, align, valign) {

            var lines = text.split("\n");
            canvasContext.imageSmoothingEnabled = false;
            fontSize = Math.round(fontSize * this.fontSizeFactor);
            canvasContext.font = fontSize + "px '" + font + "'";
            canvasContext.fillStyle = textColor;
            canvasContext.textBaseline = "middle";
            var y = rect.y;
            if (valign=="CENTER") {
             var ysize = lines.length*lineHeight;
             y = rect.y+rect.height/2.0 - ysize/2.0 + fontSize/2.0;
            }
            else if (valign=="BOTTOM") {
             var ysize = lines.length*lineHeight;
             y = rect.y + rect.height - ysize;
            }
            for (var a = 0; a < lines.length; a++) {
             var dim = canvasContext.measureText(lines[a]);
             var x = rect.width/2.0 - dim.width/2.0;
             if (align=="LEFT") x = 0;
             else if (align=="RIGHT") x = rect.width-dim.width;
             canvasContext.fillText(lines[a], rect.x + x, y + a * lineHeight);
            }
        }

        drawBlind(canvasContext, xCenter, yCenter, radius, yLevel, blindPercent, blindColor, text) {

            var radiusFactor = ((yLevel - yCenter) / radius) * 0.5 + 0.5;
            var radiusTop = radius * 2 * radiusFactor;
            var radiusBottom = radius * 2 * (1 - radiusFactor);

            // clipping area
            canvasContext.save();
            canvasContext.beginPath();
            canvasContext.arc(xCenter, yCenter, radius, 0, 2 * Math.PI, false);
            canvasContext.clip();

            // blind rectangles
            canvasContext.fillStyle = blindColor;
            canvasContext.fillRect(xCenter - radius, yCenter - radius, radius * 2, radiusTop * blindPercent);
            canvasContext.fillRect(xCenter - radius, yCenter + radius - radiusBottom + radiusBottom * (1 - blindPercent), radius * 2, radiusBottom * blindPercent);

            // restore clipping area
            canvasContext.restore();

            // optional text
            var fontName = this.rm.getSetupResourceId("facephi-widget-conf", "", this.landscape, "font_shutter_text");
            canvasContext.fillStyle = this.rm.getSetupColor("facephi-widget-conf", "", this.landscape, "color_shutter_text");
            canvasContext.font = 26.0 * this.fontSizeFactor + "px '" + fontName + "'";
            //self.adaptText(canvasWidth / 4.0, canvasContext, text, 26.0 * self.fontSizeFactor + "px " + FPhi.UserControl.Font.fontName);
            var dim = canvasContext.measureText(text);
            canvasContext.fillText(text, xCenter - dim.width / 2, yCenter + radius - radiusBottom + radiusBottom * (1 - blindPercent) + 30);
        }

        scaleRect(rectOrigin, rectDest, innerMode) {
            var centerX = rectDest.x + rectDest.width / 2;
            var centerY = rectDest.y + rectDest.height / 2;
            var factorX = rectDest.width / rectOrigin.width;
            var factorY = rectDest.height / rectOrigin.height;
            var newWidth = rectOrigin.width * factorX;
            var newHeight = rectOrigin.height * factorX;
            if (innerMode == undefined) {
                if (newHeight < rectDest.height) { // este escalado no vale. Tenemos que usar escalado en el eje Y
                    newWidth = rectOrigin.width * factorY;
                    newHeight = rectOrigin.height * factorY;
                }
            } else {
                if (newHeight >= rectDest.height) { // este escalado no vale. Tenemos que usar escalado en el eje X
                    newWidth = rectOrigin.width * factorY;
                    newHeight = rectOrigin.height * factorY;
                }
            }

            return { x: centerX - newWidth / 2, y: centerY - newHeight / 2, width: newWidth, height: newHeight };
        }

    }

    FPhi["Drawer"] = Drawer;
}
