interface IIFrameProps {
    file: string;
    title: string;
}


export const IFrame = ({title, file}: IIFrameProps) => {
    return (
      <iframe
        width="100%"
        height="100%"
        src={file}
        allowFullScreen
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    );
}