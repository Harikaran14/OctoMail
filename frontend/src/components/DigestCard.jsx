function DigestCard({digest}){

    return(
        <div>
            <h2>
                Daily Digest
            </h2>
            <p>{digest.date}</p>
            <p>{digest.content}</p>
        </div>
    )

}

export default DigestCard;
