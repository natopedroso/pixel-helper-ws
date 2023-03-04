import React, { Children, useEffect, useRef, useState } from "react";
import "jquery-mask-plugin";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface InputPhotoProps {
  value?: string | any;
  name: string;
  autoComplete?: boolean;
  readOnly?: boolean;
  aspectRatio?: 1 | number;
  maxWidth?: 1000 | number;
  src?: string;
  callback?(sender: HTMLInputElement): void;
  style: React.CSSProperties;
}

export default function InputPhoto(props: InputPhotoProps) {
  /**VARS */
  const photo = useRef<HTMLImageElement>();
  const inputPhotoFile = useRef<HTMLInputElement>();
  const [photoFile, setPhotoFile] = useState(null);
  const [photoBorder, setPhotoBorder] = useState(false);
  const photoStyle: React.CSSProperties = {
    objectFit: "cover",
    aspectRatio: props?.aspectRatio,
    height: "auto",
    width: "100%",
    maxWidth: props?.maxWidth,
    verticalAlign: "middle",
    borderWidth: photoBorder ? 3 : 1,
    borderRadius: 10,
    borderStyle: "solid",
  };
  const [src, setSrc] = useState(props?.src);

  useEffect(() => {
    setSrc(props?.src);
  }, [props?.src]);
  /**
   * RENDER
   */
  return (
    <>
      <img
        ref={photo}
        src={`${src}`}
        alt="Click ou Arraste aqui sua Logo"
        style={{ ...photoStyle, ...props?.style }}
        onDragEnter={(e) => {
          if (props?.readOnly) return;
          e.stopPropagation();
          e.preventDefault();
          setPhotoBorder(true);
        }}
        onDragLeave={(e) => {
          if (props?.readOnly) return;
          e.stopPropagation();
          e.preventDefault();
          setPhotoBorder(false);
        }}
        onDragOver={(e) => {
          if (props?.readOnly) return;
          e.stopPropagation();
          e.preventDefault();
        }}
        onDrop={(e) => {
          if (props?.readOnly) return;
          e.stopPropagation();
          e.preventDefault();
          const dt = e.dataTransfer;
          const files = dt.files;
          const exts = files[0].name.split(".");
          const ext = exts[exts.length - 1];

          if (ext !== "jpg" && ext !== "png") {
            alert("O arquivo deve ter formato .jpg ou .png");
            return false;
          }

          e.currentTarget.src = URL.createObjectURL(files[0]);
          //return;
          //setPhotoFile(files[0]);
          inputPhotoFile.current.files = files;
          setPhotoBorder(false);
        }}
        // onClick={(e) => {
        //   inputPhotoFile.current.click();
        // }}
      />
      <input
        ref={inputPhotoFile}
        type="file"
        name={props?.name}
        id="filephoto"
        accept="image/*,capture=camera"
        onChange={function (e) {
          const files = e.target.files;
          photo.current.src = URL.createObjectURL(files[0]);
          props?.callback(e.currentTarget);
        }}
        hidden
        disabled={props?.readOnly}
      />
    </>
  );
}

export function InputPhotos({ value, onChange, name, autoComplete, readOnly, aspectRatio = 1, maxWidth = 1000, src, photos: _photos, edit = false }) {
  /**VARS */ const photo = useRef();
  const inputPhotoFile = useRef();
  const [photoFile, setPhotoFile] = useState(null);

  const [photos, setPhotos] = useState(_photos ?? []);

  function handleDrop(item) {
    if (!item.destination) {
      if (window.confirm("\n\nDESEJA REALMENTE REMOVER ESTA FOTO?\n\n")) {
        var updatedList = [...photos];
        updatedList.splice(item.source.index, 1);
        setPhotos(updatedList);
      }
      return;
    }

    var updatedList = [...photos];
    const [reorderedItem] = updatedList.splice(item.source.index, 1);
    updatedList.splice(item.destination.index, 0, reorderedItem);
    setPhotos(updatedList);
  }

  /**
   * RENDER
   */
  return (
    <>
      <PhotosContainer maxWidth={maxWidth} inputPhotoFile={inputPhotoFile} setPhotos={setPhotos} name={name}>
        <DragDropContext onDragEnd={handleDrop}>
          <Droppable droppableId="list-container" direction="vertical" mode="virtual">
            {(provided) => (
              <div className="d-flex flex-column p-3 gap-3 mx-auto" {...provided.droppableProps} ref={provided.innerRef} onClick={(e) => e.stopPropagation()}>
                {photos?.map((photo, i) => {
                  return (
                    <Draggable key={i} draggableId={`${name}-${i}`} index={i}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} onClick={(e) => e.stopPropagation()}>
                          <Image photo={photo} aspectRatio={aspectRatio} />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </PhotosContainer>
      {photos?.map((photo, i) => (
        <input hidden key={i} name="order_photos[]" value={photo.name ?? photo.photo} />
      ))}
      <div ref={inputPhotoFile}></div>
    </>
  );
}

function PhotosContainer({ inputPhotoFile, maxWidth, children, setPhotos, name }) {
  const [photoBorder, setPhotoBorder] = useState(false);
  const photoStyle: React.CSSProperties = {
    overflowY: "scroll",
    objectFit: "cover",
    height: "auto",
    width: "100%",
    minHeight: 200,
    maxHeight: window.innerHeight,
    maxWidth: maxWidth,
    minWidth: 300,
    verticalAlign: "middle",
    borderWidth: photoBorder ? 3 : 1,
    borderRadius: 10,
    borderStyle: "solid",
  };
  function inputFileOnChange(e) {
    let files = e.target.files;
    if (files.length == 0) {
      return;
    }
    let ps = [];
    for (let c = 0; c < files.length; c++) {
      ps.push({ name: files[c].name, photo: URL.createObjectURL(files[c]) });
    }
    setPhotos((p) => {
      return [...p, ...ps];
    });
  }

  return (
    <div
      className="d-flex flex-column"
      style={photoStyle}
      onDragEnter={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setPhotoBorder(true);
      }}
      onDragLeave={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setPhotoBorder(false);
      }}
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setPhotoBorder(true);
      }}
      onDrop={(e) => {
        e.stopPropagation();
        e.preventDefault();
        const dt = e.dataTransfer;
        const files = dt.files;
        let exts = files[0].name.split(".");
        let ext = exts[exts.length - 1];

        if (ext != "jpg" && ext != "png") {
          alert("O arquivo deve ter formato .jpg ou .png");
          return false;
        }
        let s = createInputFile(name, inputFileOnChange);
        inputPhotoFile.current.appendChild(s);
        s.files = files;
        inputFileOnChange({ target: s });
        setPhotoBorder(false);
      }}
      onClick={(e) => {
        let s = createInputFile(name, inputFileOnChange);

        inputPhotoFile.current.appendChild(s);
        s.click();
      }}
    >
      {children}
    </div>
  );
}

function createInputFile(name, onChange) {
  let s = document.createElement("input");
  s.setAttribute("hidden", "false");
  s.type = "file";
  s.setAttribute("multiple", "true");
  s.setAttribute("accept", "image/*,capture=camera");
  s.name = name + "[]";
  s.onchange = onChange;
  return s;
}

function Image({ photo, aspectRatio }) {
  return (
    <img
      id={photo.photo}
      style={{
        aspectRatio: aspectRatio,
        width: window.innerWidth - 150,
        height: "auto",
        maxWidth: 300,
        maxHeight: 300,
        objectFit: "cover",
      }}
      src={photo?.name ? photo.photo : "/" + photo.photo}
      className="text-center "
      alt="Click or Drag here to Add photo"
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    />
  );
}
