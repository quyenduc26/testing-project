export function calculateTimeDifference(timeString: string): string {
  const time = new Date(timeString);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - time.getTime();

  const days = Math.floor(timeDifference / (1000 * 3600 * 24));
  const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
  const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));

  if (days >= 6) {
    return formatDateTime(new Date(timeString));
  } else if (days > 0) {
    return `${days} ngày, ${hours} giờ, ${minutes} phút trước`;
  } else if (hours > 0) {
    return `${hours} giờ, ${minutes} phút trước`;
  } else {
    return `${minutes} phút trước`;
  }
}

function formatDateTime(date: Date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
  return formattedDateTime;
}
