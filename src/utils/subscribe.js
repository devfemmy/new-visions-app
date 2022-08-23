import { privateLessonPaymentSuccess } from '../api/privateLessonPaymentSuccess';
import { subscribeFullLesson } from '../api/subscribeFullLesson';
import { subscribeOneLesson } from '../api/subscribeOneLesson';
import { subscribeToMultiPackage } from '../api/subscribeToMultiPackage';

export const subscribe = ({ subscribeInfo, setLoading }) => {
  const { billNumber, paymentFor, subjectId, lessonId, packageId, paymentId, couponId } =
    subscribeInfo;
  switch (paymentFor) {
    case 'MultiPackage': {
      const subscribeData = {
        package_id: packageId,
        bill_number: billNumber,
        coupon_id: couponId,
      };
      subscribeToMultiPackage({ subscribeData, setLoading });
      break;
    }
    case 'OneLesson': {
      const subscribeData = {
        subject_id: subjectId,
        lesson_id: lessonId,
        bill_number: billNumber,
        coupon_id: couponId,
      };
      subscribeOneLesson({ subscribeData, setLoading });
      break;
    }
    case 'FullLesson': {
      const subscribeData = {
        subject_id: subjectId,
        bill_number: billNumber,
        coupon_id: couponId,
      };
      subscribeFullLesson({ subscribeData, setLoading });
      break;
    }
    case 'PrivateLesson': {
      const subscribeData = {
        payment_id: paymentId,
        coupon_id: couponId,
      };
      privateLessonPaymentSuccess({ subscribeData, setLoading });
      break;
    }
    default: {
      alert('paymentFor args not matched');
    }
  }
};
