interface IIFrameProps {
    file: string;
    title: string;
    percentWidth: string;
    percentHeight: string;
}


export const IFrame = ({title, file, percentWidth, percentHeight}: IIFrameProps) => {
    return (
      <iframe
        width={percentWidth}
        height={percentHeight}
        src={file}
        allowFullScreen
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    );
}